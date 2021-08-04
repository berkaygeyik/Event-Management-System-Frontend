import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import Title from "../Event/Title/Title";
import InfoCard from "../Event/InfoCard/InfoCard";
import EventDashboard from "../Event/EventDashboard/EventDashboard";
import axios from "axios";
import QrCode from "../Event/QrCode/QrCode";
import Footer from "../Footer/Footer";

export default function EventPage(props) {
  const [user, setUser] = useState("");
  const [userData, setUserData] = useState();
  const [userRole, setUserRole] = useState("");
  const [event, setEvent] = useState();
  const [eventAdmin, setEventAdmin] = useState();
  const [eventName, setEventName] = useState(props.match.params.eventName);
  const [trigger, setTrigger] = useState(props.match.params.eventName);

  const [isAdminOfThisEvent, setIsAdminOfThisEvent] = useState(false);
  const [isUserEnrolledThisEvent, setIsUserEnrolledThisEvent] = useState(false);

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
  }, [eventName, trigger]);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    axios
      .get(`/user/${eventName}/admin`, config)
      .then((res) => setEventAdmin(res.data))
      .catch((err) => console.log(err));
  }, [eventName]);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    if (user) {
      axios
        .get(`/user/profile/${user}`, config)
        .then((res) => setUserData(res.data))
        .catch((err) => console.log(err));
    }
  }, [user]);
  useEffect(() => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    if (event && userData && user) {
      const data = {
        eventName: event.name,
        nameSurname: userData.name + " " + userData.surname,
        username: user,
        userEmail: userData.email,
      };

      if (userRole === "user" && isUserEnrolledThisEvent) {
        axios
          .post(`/mail/get-qr-code`, data, config)
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
      }
    }
  }, [user, event, userData, isUserEnrolledThisEvent]);

  
  if (!event || !props.getDate || !user || !userRole || !eventAdmin) {
    return <div></div>;
  }
  
  return (
    <div>
      <Container>
        <Row>
          <Col xs="8" style={{ paddingRight: "10px" }}>
            <Title
              user={user}
              userRole={userRole}
              getDate={props.getDate}
              event={event}
              trigger={trigger}
              setTrigger={setTrigger}
              eventAdmin={eventAdmin}
            />{" "}
            <EventDashboard
              user={user}
              userRole={userRole}
              getDate={props.getDate}
              event={event}
              eventAdmin={eventAdmin}
            />
          </Col>
          <Col xs="4" style={{ paddingLeft: 0 }}>
            <InfoCard
              user={user}
              userRole={userRole}
              userData={userData}
              getDate={props.getDate}
              event={event}
              isAdminOfThisEvent={isAdminOfThisEvent}
              setIsAdminOfThisEvent={setIsAdminOfThisEvent}
              isUserEnrolledThisEvent={isUserEnrolledThisEvent}
              setIsUserEnrolledThisEvent={setIsUserEnrolledThisEvent}
            />
            {isUserEnrolledThisEvent ? <QrCode user={user} userRole={userRole} event={event} /> : null}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
