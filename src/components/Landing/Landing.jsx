import { Button } from "reactstrap";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Landing.module.css";

export default function Landing() {
  return (
    <div
      className={styles.landingHeader}
      style={{ backgroundImage: "URL('background.jpg')" }}
    >
      <div className={styles.textButtons}>
        <h2 className={styles.title1}>
          Do you want to have fun and improve yourself?
        </h2>
        <hr></hr>
        <h4 className={styles.title2}>
          Login and attend an event or organize an event if you want.
        </h4>
        <div style={{marginTop:"20px"}}>
          <Link to={"/Login"}>
            <Button style={{backgroundColor: "var(--myGreen)"}} className={styles.button}>
              <i className="fa fa-sign-in" aria-hidden="true"></i> Login
            </Button>
          </Link>
          <Link to={"/signUp"}>
            <Button style={{backgroundColor: "var(--myGreen)"}} className={styles.button}>
              <i className="fa fa-sign-in" aria-hidden="true"></i> Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
