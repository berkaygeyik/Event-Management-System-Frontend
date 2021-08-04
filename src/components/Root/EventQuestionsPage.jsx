import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "reactstrap";
import Title from "../Event/Title/Title";
import EventPoll from "../EventQuestions/EventPoll/EventPoll";
import EventPollQuestions from "../EventQuestions/EventPollQuestions/EventPollQuestions";
import EventRegisterQuestions from "../EventQuestions/EventRegisterQuestions/EventRegisterQuestions";
import Footer from "../Footer/Footer";

export default function EventQuestionsPage(props) {
  const [user, setUser] = useState("");
  const [userData, setUserData] = useState();
  const [userRole, setUserRole] = useState("");
  const [event, setEvent] = useState();
  const [eventAdmin, setEventAdmin] = useState();
  const [showAnswerDetails, setShowAnswerDetails] = useState(false);
  const [eventPollUsers, setEventPollUsers] = useState();
  const [trigger, setTrigger] = useState();

  const [eventName, setEventName] = useState(props.match.params.eventName);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    setUser(localStorage.getItem("username"));
    setUserRole(localStorage.getItem("userRole"));

    axios
      .get(`/user/events/${eventName}`, config)
      .then((res) => setEvent(res.data))
      .catch((err) => console.log(err));

    axios
      .get(`/user/eventPollUsers/${eventName}`, config)
      .then((res) => {
        console.log(res.data.userList);
        setEventPollUsers(res.data.userList);
      })
      .catch((err) => console.log(err));

    axios
      .get(`/user/${eventName}/admin`, config)
      .then((res) => setEventAdmin(res.data))
      .catch((err) => console.log(err));
  }, [eventName, trigger]);

  const changeShowAnswerDetails = () => {
    setShowAnswerDetails(!showAnswerDetails);
  };
  const changeTrigger = () => {
    setTrigger(!trigger)
  }
  if (!user || !userRole || !event || !userRole || !eventPollUsers || !eventAdmin || !changeTrigger) {
    return <div></div>;
  }

  if (userRole==="admin" && eventAdmin.username !== user) {
    return <div></div>;
  }
  
  return (
    <div>
      <Container>
        <Row>
          <Title getDate={props.getDate} event={event} userRole={userRole} eventAdmin={eventAdmin} />
        </Row>

        {userRole === "admin" ? (
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                style={{
                  fontSize: "1.2em",
                  fontWeight: "bold",
                  margin: "10px",
                }}
                onClick={changeShowAnswerDetails}
              >
                <i class="fa fa-chevron-down" aria-hidden="true"></i>{" "}
                {!showAnswerDetails ? "Show Answers and Details" : "Show Questions"}{" "}
                <i class="fa fa-chevron-down" aria-hidden="true"></i>
              </Button>
            </div>

            {!showAnswerDetails ? (
              <Row>
                <Col xs="6">
                  <EventPollQuestions
                    user={user}
                    userRole={userRole}
                    event={event}
                    showAnswerDetails={showAnswerDetails}
                  />
                </Col>
                <Col xs="6">
                  <EventRegisterQuestions
                    user={user}
                    userRole={userRole}
                    event={event}
                    showAnswerDetails={showAnswerDetails}
                  />
                </Col>
              </Row>
            ) : (
              <Col xs="12">
                <EventPollQuestions
                  user={user}
                  userRole={userRole}
                  event={event}
                  showAnswerDetails={showAnswerDetails}
                />
              </Col>
            )}
          </div>
        ) : (
          <div>
            <EventPoll user={user} userRole={userRole} event={event} eventPollUsers={eventPollUsers} changeTrigger={changeTrigger}/>
          </div>
        )}
      </Container>
    </div>
  );
}
