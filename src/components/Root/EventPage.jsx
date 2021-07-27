import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import Title from "../Event/Title/Title";
import InfoCard from "../Event/InfoCard/InfoCard";
import EventDashboard from "../Event/EventDashboard/EventDashboard";
import axios from "axios";

export default function EventPage(props) {
  const [user, setUser] = useState("");
  const [userData, setUserData] = useState();
  const [userRole, setUserRole] = useState("");
  const [event, setEvent] = useState();
  const [eventAdmin, setEventAdmin] = useState();
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
      .get(`/user/events/${eventName}`, config)
      .then((res) => setEvent(res.data))
      .catch((err) => console.log(err));
  }, [eventName]);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    axios
      .get(`/user/profile/${user}`, config)
      .then((res) => setUserData(res.data))
      .catch((err) => console.log(err));

    axios
      .get(`/user/${eventName}/admin`, config)
      .then((res) => setEventAdmin(res.data))
      .catch((err) => console.log(err));

  }, [user, eventName]);

  if (!event || !props.getDate || !user || !userRole || !eventAdmin) {
    return <div></div>;
  }

  return (
    <div>
      <Container>
        <Row>
          <Col xs="8" style={{ paddingRight: "10px" }}>
            <Title getDate={props.getDate} event={event} />{" "}
            <EventDashboard user={user} userRole={userRole} getDate={props.getDate} event={event} eventAdmin={eventAdmin} />
          </Col>
          <Col xs="4" style={{ paddingLeft: 0 }}>
            <InfoCard user={user} userRole={userRole} userData={userData} getDate={props.getDate} event={event} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
