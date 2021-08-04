import React from "react";
import { Grid, Card, Button } from "@material-ui/core";

import { Badge, CardImg, CardTitle, CardSubtitle, Form, FormGroup, Label, Input, Container } from "reactstrap";
import { Link } from "react-router-dom";

import styles from "./MyEvents.module.css";
import Alert from "@material-ui/lab/Alert";

const defaultImage =
  "https://media-exp3.licdn.com/dms/image/C4D1BAQFAC3o2eHS_vA/company-background_10000/0/1565182814457?e=2159024400&v=beta&t=zWT-JPXEhmCFr0L8eTn0LswSz82VWuuJBkRuPAvLN-Q";

export default function MyEvents(props) {
  const showEvents = (event, index, registrable) => {
    return (
      <div className="col-12 col-sm-12 col-md-6 col-xl-4 mb-5" key={index}>
        <Card className={styles.cardContent}>
          <div className={styles.center}>
            <CardImg top width="100%" src={event.imageURL} alt="Card Image" className={styles.image}></CardImg>
            <CardTitle tag="h4">{event.name}</CardTitle>
            <CardSubtitle className={styles.organizer}>
              <i className="fa fa-user-circle-o" aria-hidden="true"></i>
              {"  "}
              {event.organizer}
            </CardSubtitle>
            <div className={styles.date}>
              <CardSubtitle
                style={{
                  fontSize: "1.1em",
                  marginTop: "10px",
                  marginBottom: "3px",
                }}
              >
                <Badge
                  style={{
                    backgroundColor: "var(--myWhite)",
                    color: "black",
                  }}
                >
                  <i className="fa fa-calendar" aria-hidden="true"></i>
                  {"  Start: "}
                  {props.getDate(event.startDate)}
                  {console.log(new Date(event.startDate))}
                </Badge>
              </CardSubtitle>

              <CardSubtitle style={{ fontSize: "1.1em", marginBottom: "10px" }}>
                <Badge
                  style={{
                    backgroundColor: "var(--myWhite)",
                    color: "black",
                  }}
                >
                  <i className="fa fa-calendar" aria-hidden="true"></i>
                  {"  End: "}
                  {props.getDate(event.endDate)}
                </Badge>
              </CardSubtitle>
            </div>
          </div>
          <div className={styles.center}>
            {!registrable ? (
              <Alert style={{ margin: "10px", marginTop: 0 }} severity="warning">
                The start date of the event has passed
              </Alert>
            ) : null}
            <CardSubtitle className={styles.quota}>
              <Badge style={{ backgroundColor: "var(--myBlue)" }}>
                <i class="fa fa-users" aria-hidden="true"></i> Quota: {event.registeredUserCount} / {event.quota}
              </Badge>
            </CardSubtitle>

            <CardSubtitle className={styles.platformName}>
              <i className="fa fa-map-marker" aria-hidden="true"></i> {event.location}
            </CardSubtitle>

            <Link style={{ textDecoration: "none" }} to={`/event/${event.name}`}>
              <Button
                href={event.eventLink}
                target="_blank"
                variant="contained"
                color="primary"
                className={styles.linkButton}
              >
                <i className="fa fa-external-link" aria-hidden="true"></i> &nbsp; Go To Event
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  };

  if (!props.user || !props.userRole || !props.eventList || !props.getDate) {
    return <div></div>;
  }

  return (
    <div>
      <Container className={styles.root}>
        {props.userRole === "admin" ? (
          <h2 className={styles.title}>My Created Events</h2>
        ) : (
          <h2 className={styles.title}>Events I have Registered For </h2>
        )}
        <hr className={styles.hr} />
        <Grid container spacing={0} item xs={12}>
          {props.eventList.map((event, index) => showEvents(event, index, new Date() < new Date(event.startDate)))}
        </Grid>
      </Container>
    </div>
  );
}
