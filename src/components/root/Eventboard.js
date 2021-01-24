import React, { Component } from "react";
import { Row, Col, Jumbotron } from "reactstrap";
import Title from "../eventPageComponents/title/Title";
import InfoCard from "../eventPageComponents/infoCard/InfoCard";
import EventDashboard from "../eventPageComponents/eventDashboard/EventDashboard";

export default class Eventboard extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col xs="8" style={{ paddingRight: 0 }}>
            <Title /> <EventDashboard />
          </Col>
          <Col xs="4" style={{ paddingLeft: 0 }}>
            <InfoCard />
          </Col>
        </Row>
      </div>
    );
  }
}
