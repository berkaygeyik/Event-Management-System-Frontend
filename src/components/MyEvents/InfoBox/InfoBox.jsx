import React, { useState } from "react";

import styles from "./InfoBox.module.css";

export default function InfoBox(props) {
  
  const userRoleText = () => {
    if (props.userRole === "admin") {
      return (
        <div>
          <h4 className={styles.text2}>You are an Admin type user</h4>
          <p className={styles.text2}>
            You can create a new event if you want. Below, you can see the
            events you have created and you can update and delete them by going
            to the event pages.
          </p>
        </div>
      );
    }
    if (props.userRole === "user") {
      return (
        <div>
          <h4 className={styles.text2}>You are User type user</h4>
          <p className={styles.text2}>
            You can join an event if you want. Below, you can see the events you
            have joined and you can join and leave them by going to the event
            pages.
          </p>
        </div>
      );
    }
  };
  if (!props.userRole || !localStorage.getItem("userNameSurname")) {
    return <div></div>;
  }

  return (
    <div className={styles.allBox}>
      <h2 className={styles.text} for="text">
        Hello, Welcome {localStorage.getItem("userNameSurname")}
        
      </h2>
      {userRoleText()}
    </div>
  );
}
