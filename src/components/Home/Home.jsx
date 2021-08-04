import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  Button,
} from "@material-ui/core";

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

import styles from "./Home.module.css";
import searchBarStyles from "./SearchBar.module.css";


export default function Home(props) {
  // if (props.user) {
  //   return <h2> {props.user} </h2>;
  // }
  const [user, setUser] = useState("");
  const [userRole, setUserRole] = useState("");
  const [eventList, setEventList] = useState("");
  const [searchInputValue, setSearchInputValue] = useState("");

  useEffect(() => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    setUser(localStorage.getItem("username"));
    setUserRole(localStorage.getItem("userRole"));

    axios
      .get(`/user/events`, config)
      .then((res) => {
        //console.log(res.data);
        setEventList(res.data);
      })
      .catch((err) => console.log(err));

    //console.log(user, userRole);
  }, []);

  

  const editSearchInput = (event) => {
    setSearchInputValue(event.target.value);
  };

  const searchBar = () => {


    return (
      <div>
        <Form className={searchBarStyles.form}>
          <FormGroup className={searchBarStyles.formGroup}>
            <Label className={searchBarStyles.label} for="text">
              <i className="fa fa-search" aria-hidden="true"></i>&nbsp; Search
              Clubs
            </Label>
            <Input
              onChange={(subclub) => editSearchInput(subclub)}
              className={searchBarStyles.input}
              type="text"
              name="text"
              id="text"
              placeholder="Enter a search key..."
            />
          </FormGroup>
        </Form>
      </div>
    );
  };

  const searchCheck = (event, index) => {
    if (
      searchInputValue !== "" &&
      event.name.toLowerCase().indexOf(searchInputValue.toLowerCase()) === -1
    ) {
      return null;
    }

    return (
      <div className="col-12 col-sm-12 col-md-6 col-xl-4 mb-5" key={index}>
        <Card className={styles.cardContent}>
          <div className={styles.center}>
            <CardImg
              top
              width="100%"
              src={event.imageURL}
              alt="Card Image"
              className={styles.image}
            ></CardImg>
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
            <CardSubtitle className={styles.quota}>
              <Badge style={{ backgroundColor: "var(--myBlue)" }}>
                <i class="fa fa-users" aria-hidden="true"></i> Quota:{" "}
                {event.registeredUserCount} / {event.quota}
              </Badge>
            </CardSubtitle>
            <CardSubtitle className={styles.platformName}>
              <i className="fa fa-map-marker" aria-hidden="true"></i>{" "}
              {event.location}
            </CardSubtitle>
            <Link style={{ textDecoration:"none" }} to={`/event/${event.name}`}>
              <Button
                href={event.eventLink}
                target="_blank"
                variant="contained"
                color="primary"
                className={styles.linkButton}
              >
                <i className="fa fa-external-link" aria-hidden="true"></i>{" "}
                &nbsp; Go To Event
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  };

  if (!eventList) {
    return null;
  }

  if (!props.getDate()){
    return null;
  }

  return (
    <div>
      <div className={searchBarStyles.allSearch}>
        <div className={searchBarStyles.centerSearch}>{searchBar()}</div>

        <div className={searchBarStyles.title}>All Events</div>
      </div>

      {/* <Row className={styles.rowDashboard}>
        {eventList.map((event) => eventCard(event.name, event))}
      </Row> */}
      <Container className={styles.root}>
        <Grid container spacing={0} item xs={12}>
          {eventList.map((event, index) => searchCheck(event, index))}
        </Grid>
      </Container>
    </div>
  );
}
