import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Jumbotron,
  Button,
} from "reactstrap";

import styles from "./Title.module.css";

class Title extends Component {
  showTitle = () => {
    return (
      <Jumbotron className={styles.jumbotron}>
        <h2 className={styles.titleName}>{this.props.currentEvent.name}</h2>
        <div className={styles.date}>
          <p style={{opacity: 0.5}}>Starting Date:</p><span>&nbsp;</span>{this.props.currentEvent.date.start} 
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <p style={{opacity: 0.5}}>Ending Date:</p><span>&nbsp;</span>{this.props.currentEvent.date.end}
        </div>

        <hr className="my-2" />
        <div className={styles.organizator}>
        <p style={{opacity: 0.5}}>From Who:</p><span>&nbsp;&nbsp;</span>{this.props.currentEvent.organizator}
        </div>
        <p className="lead">
          <Button color="dark" className={styles.button}>Learn More</Button>
        </p>
      </Jumbotron>
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

export default connect(mapStateToProps)(Title);
