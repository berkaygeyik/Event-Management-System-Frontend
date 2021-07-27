import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Card, CardTitle, CardText } from "reactstrap";

import styles from "./InfoCard.module.css";

export default function Infocard(props) {
  const history = useHistory();

  const [adminEvents, setAdminEvents] = useState();
  const [enrolledEvents, setEnrolledEvents] = useState();
  const [isAdminOfThisEvent, setIsAdminOfThisEvent] = useState(false);
  const [isUserEnrolledThisEvent, setIsUserEnrolledThisEvent] = useState(false);
  const [message, setMessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const [config, setConfig] = useState();
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    const newConfig = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    setConfig(newConfig);

    if (props.user) {
      axios
        .get(`/admin/${props.user}/events`, config)
        .then((res) => setAdminEvents(res.data))
        .catch((err) => console.log(err));

      axios
        .get(`/user/${props.user}/enrolledEvents`, config)
        .then((res) => setEnrolledEvents(res.data))
        .catch((err) => console.log(err));
    }
  }, [props.user]);

  useEffect(() => {
    if (adminEvents) {
      if (props.userRole === "admin") {
        for (let i = 0; i < adminEvents.length; i++) {
          if (adminEvents[i].name === props.event.name) {
            setIsAdminOfThisEvent(true);
            break;
          }
        }
      }
    }

    if (enrolledEvents) {
      if (props.userRole === "user") {
        for (let i = 0; i < enrolledEvents.length; i++) {
          if (enrolledEvents[i].name === props.event.name) {
            setIsUserEnrolledThisEvent(true);
            break;
          }
        }
      }
    }
  }, [adminEvents, enrolledEvents]);

  const showAlert = () => {
    if (alert) {
      if (message) {
        if (message.messageType === "ERROR") {
          return (
            <Alert style={{ marginTop: "10px" }} severity="error">
              {message.message}
            </Alert>
          );
        }
        if (message.messageType === "SUCCESS") {
          return (
            <Alert style={{ marginTop: "10px" }} severity="success">
              {message.message}
            </Alert>
          );
        }
      }
    }
  };

  const join = () => {
    axios
      .post(`/user/${props.user}/enrollTo/${props.event.name}`, config)
      .then((res) => {
        setMessage(res.data);
        if (res.data.messageType === "SUCCESS") {
          setIsUserEnrolledThisEvent(true);
        }
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 2000);
      })
      .catch((err) => console.log(err));
  };

  const sendEmail = () => {
    const data = {
      eventName: props.event.name,
      nameSurname: props.userData.name + " " + props.userData.surname,
      username: props.user,
      userEmail: props.userData.email,
    };

    axios
      .post(`/mail/send-qr-code`, data, config)
      .then((res) => {
        setMessage(res.data);
        console.log(res.data)
        if (res.data.messageType === "SUCCESS") {
          setIsUserEnrolledThisEvent(true);
        }
        // setAlert(true);
        // setTimeout(() => {
        //   setAlert(false);
        // }, 2000);
      })
      .catch((err) => console.log(err));
  };

  const joinButtonClick = () => {
    join();
    sendEmail();
  };

  const leaveButtonClick = () => {
    axios
      .post(`/user/${props.user}/leaveFromEvent/${props.event.name}`, config)
      .then((res) => {
        setMessage(res.data);
        if (res.data.messageType === "SUCCESS") {
          setIsUserEnrolledThisEvent(false);
        }
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 2000);
      })
      .catch((err) => console.log(err));
  };

  const cardButton = () => {
    if (props.userRole === "admin") {
      if (isAdminOfThisEvent) {
        return (
          <>
            <CardText style={{ marginBottom: "10px" }}>
              You are Admin of this event. You can update or delete this event.
            </CardText>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Button
                style={{ width: "100%", marginRight: "5px", outline: "none" }}
                color="success"
                onClick={() => history.push(`/updateEvent/${props.event.name}`)}
              >
                <i className="fa fa-check" aria-hidden="true"></i> Update Event
              </Button>
              <Button
                style={{ width: "100%", marginLeft: "5px", outline: "none" }}
                color="danger"
                onClick={handleDelete}
              >
                <i className="fa fa-check" aria-hidden="true"></i> Delete Event
              </Button>
            </div>
          </>
        );
      } else {
        return (
          <>
            <CardText style={{ marginBottom: "10px" }}>
              You cannot join because you are an admin!
            </CardText>
            <Button disabled color="secondary" style={{ outline: "none" }}>
              <i className="fa fa-check" aria-hidden="true"></i> Join to Event
            </Button>
          </>
        );
      }
    }
    if (props.userRole === "user") {
      if (isUserEnrolledThisEvent) {
        return (
          <>
            <CardText style={{ marginBottom: "10px" }}>
              You joined to this event. Do you want to leave ?
            </CardText>
            <Button
              color="danger"
              style={{ outline: "none" }}
              onClick={leaveButtonClick}
            >
              <i className="fa fa-times" aria-hidden="true"></i> Leave
            </Button>
            {showAlert()}
          </>
        );
      } else {
        return (
          <>
            <CardText style={{ marginBottom: "10px" }}>
              Do you want to join ?
            </CardText>
            <Button
              color="success"
              style={{ outline: "none" }}
              onClick={joinButtonClick}
            >
              <i className="fa fa-check" aria-hidden="true"></i> Join to Event
            </Button>
            {showAlert()}
          </>
        );
      }
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`/admin/events/${props.event.name}`, config)
      .then((res) => {
        if (res.data.messageType === "SUCCESS") {
          //history.push(`/event/${name}`);
          setAlert(true);
          history.push(`/myEvents`);
        }
        if (res.data.messageType === "ERROR") {
          //history.push(`/event/${name}`);
          setAlert(true);
          setTimeout(() => {
            setMessage("");
            setAlert(false);
          }, 2000);
        }
      })
      .catch((err) => console.log(err));
  };

  if (!props.user || !props.userRole || !props.userData || !props.event) {
    return null;
  }

  const showCard = () => {
    return (
      <div style={{ marginTop: "100px" }}>
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
            <span className={styles.span}>Start Date: </span>{" "}
            {props.getDate(props.event.startDate)}
          </CardText>
          <CardText style={{ marginBottom: 0 }}>
            <span className={styles.span}>End Date: </span>{" "}
            {props.getDate(props.event.endDate)}
          </CardText>
          <hr className={styles.hr}></hr>
          <i
            style={{ fontSize: "1.5em", opacity: "0.5" }}
            className="fa fa-map-marker"
            aria-hidden="true"
          ></i>
          <CardText style={{ marginBottom: 0 }}>
            <span className={styles.span}>Location: </span>{" "}
            {props.event.location}
          </CardText>
          <CardText style={{ marginBottom: 0 }}>
            <span className={styles.span}>Address: </span> {props.event.address}
          </CardText>
          <hr className={styles.hr}></hr>
          <i
            style={{ fontSize: "1.5em", opacity: "0.5" }}
            className="fa fa-question-circle-o"
            aria-hidden="true"
          ></i>
          <CardText style={{ marginBottom: 0 }}>
            <span className={styles.span}>Participants: </span>{" "}
            {props.event.registeredUserCount}
          </CardText>
          <CardText style={{ marginBottom: 0 }}>
            <span className={styles.span}>Quota: </span> {props.event.quota}
          </CardText>
          <hr className={styles.hr}></hr>

          {cardButton()}
        </Card>
      </div>
    );
  };

  return showCard();
}
