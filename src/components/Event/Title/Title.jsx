import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { CardImg, CardSubtitle, CardTitle, Jumbotron, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Button, Card } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import styles from "./Title.module.css";
import cardStyles from "../EventDashboard/Participants/Participants.module.css";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function Title(props) {
  const history = useHistory();
  const [alert, setAlert] = useState(false);

  const [config, setConfig] = useState({
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  const [winnerUserData, setWinnerUserData] = useState();
  const [rendered, setRendered] = useState();
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    if (props.event) {
      axios
        .get(`/user/profile/${props.event.giftDrawUser}`, config)
        .then((res) => {
          setWinnerUserData(res.data);
          setRendered("rendered");
          // console.log(winnerUserData)
        })
        .catch((err) => {
          setRendered("rendered");
          console.log(err);
        });
    }
  }, [props.event, config, props.trigger, modal]);

  const giftDraw = () => {
    if (props.event) {
      if (new Date() < new Date(props.event.startDate)) {
        setAlert("error");
        setTimeout(() => {
          setAlert("");
        }, 2000);
      } else {
        axios
          .post(`/admin/giftDraw/${props.event.name}`, config)
          .then((res) => {
            console.log(res.data);
            props.setTrigger(!props.trigger);
            setTimeout(() => {
              setAlert("success");
            }, 400);
            setTimeout(() => {
              setAlert("");
            }, 2000);
          })
          .catch((err) => console.log(err));
      }
    }
  };

  if (!props.event || !props.getDate() || !props.userRole || !config || !rendered || !props.eventAdmin) {
    return null;
  }

  const showTitle = () => {
    return (
      <Jumbotron className={styles.jumbotron}>
        <h2 className={styles.titleName}>{props.event.name}</h2>
        <div className={styles.date}>
          <p style={{ opacity: 0.5 }}>Starting Date:</p>
          <span>&nbsp;</span>
          {props.getDate(props.event.startDate)}
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <p style={{ opacity: 0.5 }}>Ending Date:</p>
          <span>&nbsp;</span>
          {props.getDate(props.event.endDate)}
        </div>

        <hr className="my-2" />
        <div className={styles.organizer}>
          <p style={{ opacity: 0.5 }}>Organizer:</p>
          <span>&nbsp;&nbsp;</span>
          {props.event.organizer}
        </div>
        <div className={styles.titleButtons}>
          <Button
            color="dark"
            className={styles.detailButton}
            onClick={() => history.push(`/event/${props.event.name}`)}
          >
            EVENT DETAILS
          </Button>
          <div>
            {winnerUserData ? (
              <Button color="dark" className={styles.giftDrawButton} onClick={toggle}>
                Gift Draw Winner
              </Button>
            ) : null}

            <Modal isOpen={modal} toggle={toggle}>
              <ModalHeader style={{ display: "flex", justifyContent: "center" }}>
                Gift Draw Winner of This Event
              </ModalHeader>
              <ModalBody>
                <Card className={cardStyles.cardContent}>
                  <div className={cardStyles.center}>
                    {/* {console.log(winnerUserData.username)} */}
                    <CardImg
                      top
                      width="100%"
                      src={process.env.PUBLIC_URL + "/" + winnerUserData.imageURL}
                      alt="Card Image"
                      style={{ width: "70%", marginBottom: "20px" }}
                    ></CardImg>
                    <CardTitle tag="h4">
                      {winnerUserData.name} {winnerUserData.surname}
                    </CardTitle>
                    <CardSubtitle className={cardStyles.username}>
                      <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                      {"  "}
                      {winnerUserData.username}
                    </CardSubtitle>
                  </div>
                </Card>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
            {console.log(props.eventAdmin.username, props.user)}
            {props.userRole === "admin" && props.eventAdmin.username === props.user ? (
              <Button color="dark" className={styles.giftDrawButton} onClick={giftDraw}>
                {winnerUserData ? "Gift Draw Again" : "Gift Draw"}
              </Button>
            ) : null}
          </div>
        </div>
        {alert === "success" ? (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Alert style={{ marginTop: "10px" }} severity="success">
              Gift draw was made, the winner is {winnerUserData.username}.
            </Alert>
          </div>
        ) : null}
        {alert === "error" ? (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Alert style={{ marginTop: "10px" }} severity="error">
              Before the start date, gift draw are not allowed.
            </Alert>
          </div>
        ) : null}
      </Jumbotron>
    );
  };

  return <div>{showTitle()}</div>;
}
