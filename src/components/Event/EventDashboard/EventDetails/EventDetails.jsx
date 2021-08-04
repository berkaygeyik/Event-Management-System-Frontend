import React from "react";
import { Jumbotron, Button } from "reactstrap";

import styles from "./EventDetails.module.css";

export default function EventDetails(props) {
  if (!props.event) {
    return null;
  }

  const showDetails = () => {
    return (
      <div>
        <h3 className={styles.board}>Event Details:</h3>
        <div>
          <img className={styles.image} src={process.env.PUBLIC_URL + "/" + props.event.imageURL} alt="Image" />
        </div>

        <div className={styles.details}>{props.event.details} </div>
      </div>
    );
  };

  return showDetails();
}
