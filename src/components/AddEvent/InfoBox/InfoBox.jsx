import React from "react";

import styles from "./InfoBox.module.css";

export default function InfoBox(props) {
  const text = () => {
    if (props.update) {
      return (
        <h5 className={styles.text2} for="text">
          You can update event by filling out the form below.
        </h5>
      );
    } else {
      return (
        <h5 className={styles.text2} for="text">
          You can add an event by filling out the form below.
        </h5>
      );
    }
  };

  return (
    <div>
      <div className={styles.allBox}>
        <h2 className={styles.text} for="text">
          Hello, Welcome {localStorage.getItem("userNameSurname")}
        </h2>
        {text()}
      </div>
    </div>
  );
}
