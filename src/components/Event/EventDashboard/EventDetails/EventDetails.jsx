import React from "react";
import { Jumbotron, Button } from "reactstrap";

import styles from "./EventDetails.module.css";

const defaultImage =
  "https://media-exp3.licdn.com/dms/image/C4D1BAQFAC3o2eHS_vA/company-background_10000/0/1565182814457?e=2159024400&v=beta&t=zWT-JPXEhmCFr0L8eTn0LswSz82VWuuJBkRuPAvLN-Q";

export default function EventDetails(props) {
  if (!props.event) {
    return null;
  }

  const showDetails = () => {
    return (
      <div>
        <h3 className={styles.board}>Event Details:</h3>
        <div>
          <img className={styles.image} src={defaultImage} alt="Image" />
        </div>

        <div className={styles.details}>{props.event.details} </div>
      </div>
    );
  };

  return showDetails();
}
