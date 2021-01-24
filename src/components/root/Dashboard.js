import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import CategoryList from "../categories/CategoryList";
import EventList from "../events/EventList";
import Advertisements from "../Carousel/Carousel";


export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col xs="3">
            <CategoryList />
          </Col>
          <Col xs="9">
            <Advertisements />
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <EventList />
          </Col>
        </Row>
      </div>
    );
  }
}
