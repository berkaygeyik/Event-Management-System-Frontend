import axios from "axios";
import React, { useEffect, useState } from "react";
import { Grid, Card, Button } from "@material-ui/core";

import {
  Badge,
  CardImg,
  CardTitle,
  CardSubtitle,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
} from "reactstrap";
import { Link } from "react-router-dom";

import styles from "./Participants.module.css";

const defaultImage = "/user-icon.png";

export default function Participants(props) {
  const [eventParticipants, setEventParticipants] = useState();
  useEffect(() => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    if (props.event) {
      axios
        .get(`/user/${props.event.name}/participants`, config)
        .then((res) => {
          console.log(res.data);
          setEventParticipants(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [props.event]);

  const showParticipants = (participant, index) => {
    return (
      <div
        className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 mb-5"
        key={index}
      >
        <Card className={styles.cardContent}>
          <div className={styles.center}>
            <CardImg
              top
              width="100%"
              src={defaultImage}
              alt="Card Image"
              style={{ width: "70%", marginBottom: "20px" }}
            ></CardImg>
            <CardTitle tag="h4">
              {participant.name} {participant.surname}
            </CardTitle>
          </div>
          <CardSubtitle className={styles.username}>
            <i className="fa fa-user-circle-o" aria-hidden="true"></i>
            {"  "}
            {participant.username}
          </CardSubtitle>
          <CardSubtitle className={styles.username}>
            <i class="fa fa-envelope-o" aria-hidden="true"></i>
            {"  "}
            {participant.email}
          </CardSubtitle>
          <CardSubtitle className={styles.username}>
            <i class="fa fa-id-card-o" aria-hidden="true"></i>
            {"  "}
            {participant.tcIdentificationNumber}
          </CardSubtitle>
        </Card>
      </div>
    );
  };

  if (
    !props.user ||
    !props.userRole ||
    !props.event ||
    !props.getDate() ||
    !eventParticipants
  ) {
    return null;
  }
  return (
    <div>
      <h3 className={styles.title}>Enrolled Participants:</h3>
      <Grid container spacing={0} item xs={12}>
        {eventParticipants.map((participant, index) =>
          showParticipants(participant, index)
        )}
      </Grid>
    </div>
  );
}
