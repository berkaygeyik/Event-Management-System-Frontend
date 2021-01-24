import React, { Component } from "react";
import { connect } from "react-redux";
import { Jumbotron, Button } from "reactstrap";

import styles from "./EventDetails.module.css";

const defaultImage =
  "https://www.beyhanbudak.com.tr/wp-content/uploads/2017/08/TED-Talks.png";

class EventDetails extends Component {
  showDetails = () => {
    return (
      <div>
        <h3 className={styles.board}>Event Details:</h3>
        <img
          className={styles.image}
          src={
            this.props.currentEvent.image === ""
              ? defaultImage
              : this.props.currentEvent.image
          }
          alt="Image"
        />
        <div className={styles.details}>{this.props.currentEvent.details} </div>
      </div>
    );
  };

  render() {
    return this.showDetails();
  }
}

function mapStateToProps(state) {
  return {
    currentEvent: state.eventPageReducer,
  };
}

export default connect(mapStateToProps)(EventDetails);
