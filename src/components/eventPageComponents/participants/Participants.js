import React, { Component } from "react";
import { connect } from "react-redux";
import { Jumbotron, Button, Row, Col } from "reactstrap";

import styles from "./Participants.module.css";

const defaultImage =
  "https://www.beyhanbudak.com.tr/wp-content/uploads/2017/08/TED-Talks.png";

class Participants extends Component {
  showParticipants = () => {
    return (
      <div>
        <Row>
            <Col xs="4"></Col>
            <Col xs="8"></Col>
        </Row>
        <h3 className={styles.board}>Participants:</h3>
        <div className={styles.details}>{this.props.currentEvent.details} </div>
      </div>
    );
  };

  render() {
    return this.showParticipants();
  }
}

function mapStateToProps(state) {
  return {
    currentEvent: state.eventPageReducer,
  };
}

export default connect(mapStateToProps)(Participants);
