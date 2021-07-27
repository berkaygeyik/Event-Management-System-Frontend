import React, { Component, useEffect } from "react";
import { connect } from "react-redux";
import { Jumbotron } from "reactstrap";
import { Button } from "@material-ui/core";

import styles from "./Title.module.css";

export default function Title(props) {
  
  const showTitle = () => {

    
    if(!props.event || !props.getDate()){
      return null;
    }
    return (
      <Jumbotron className={styles.jumbotron}>
        <h2 className={styles.titleName}>{props.event.name}</h2>
        <div className={styles.date}>
          <p style={{ opacity: 0.5 }}>Starting Date:</p>
          <span>&nbsp;</span>{props.getDate(props.event.startDate)}
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <p style={{ opacity: 0.5 }}>Ending Date:</p>
          <span>&nbsp;</span>{props.getDate(props.event.endDate)}
        </div>

        <hr className="my-2" />
        <div className={styles.organizer}>
          <p style={{ opacity: 0.5 }}>Organizer:</p>
          <span>&nbsp;&nbsp;</span>{props.event.organizer}
        </div>
        <p className="lead">
          <Button color="dark" className={styles.detailButton}>
            Learn More
          </Button>
        </p>
      </Jumbotron>
    );
  };

  return <div>{showTitle()}</div>;
}
