import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Card, CardTitle, CardText } from "reactstrap";

import styles from "./InfoCard.module.css";

class InfoCard extends Component {
  showTitle = () => {
    return (
      <div>
        <Card
          body
          inverse
          style={{ backgroundColor: "#333", borderColor: "#333" }}
        >
          <i
            style={{ fontSize: "1.5em", opacity: "0.5" }}
            className="fa fa-clock-o"
            aria-hidden="true"
          ></i>
          <CardText style={{ marginBottom: 0 }}>
            <span className={styles.span}>from:</span>{" "}
            {this.props.currentEvent.date.start}
          </CardText>
          <CardText style={{ marginBottom: 0 }}>
            <span className={styles.span}>to:</span>{" "}
            {this.props.currentEvent.date.end}
          </CardText>
          <hr className={styles.hr}></hr>

          <CardText style={{ marginBottom: 0 }}>
            <i
              style={{ fontSize: "1.5em", opacity: "0.5" }}
              className="fa fa-map-marker"
              aria-hidden="true"
            ></i>
            <span>&nbsp;&nbsp;</span>
            {this.props.currentEvent.location}
          </CardText>
          <hr className={styles.hr}></hr>
          <i
            style={{ fontSize: "1.5em", opacity: "0.5" }}
            class="fa fa-question-circle-o"
            aria-hidden="true"
          ></i>
          <CardText style={{ marginBottom: 0 }}>
            <span className={styles.span}>participants:</span>{" "}
            {this.props.currentEvent.numberOfParticipants}
          </CardText>
          <CardText style={{ marginBottom: 0 }}>
            <span className={styles.span}>limit:</span>{" "}
            {this.props.currentEvent.limitOfParticipants}
          </CardText>
          <hr className={styles.hr}></hr>
          <CardText style={{ marginBottom: "10px"}}>Do you want to join ?</CardText>
          <Button color="success" ><i class="fa fa-check" aria-hidden="true"></i> Join</Button>
        </Card>
      </div>
    );
  };

  render() {
    return this.showTitle();
  }
}

function mapStateToProps(state) {
  return {
    currentEvent: state.eventPageReducer,
  };
}

export default connect(mapStateToProps)(InfoCard);
