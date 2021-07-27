import React, { useEffect, useState } from "react";
// import { ValidationForm, TextInput } from "react-bootstrap4-form-validation";
import {
  Button,
  Card,
  CardTitle,
  Container,
  FormGroup,
  Input,
  Label,
  CardImg,
  Col,
  Form,
} from "reactstrap";
import Alert from "@material-ui/lab/Alert";
import { Redirect, useHistory } from "react-router-dom";

import styles from "./AddEvent.module.css";
import axios from "axios";

export default function AddEvent(props) {
  const history = useHistory();

  

  const [name, setName] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [details, setDetails] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [quota, setQuota] = useState();
  const [registeredUserCount, setRegisteredUserCount] = useState();
  const [imageURL, setImageURL] = useState("");

  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    if (props.user && props.update && props.eventName) {
      axios
        .get(`/user/events/${props.eventName}`, config)
        .then((res) => {
          setName(res.data.name);
          setOrganizer(res.data.organizer);
          setStartDate(res.data.startDate.split("T")[0]);
          setStartTime(res.data.startDate.split("T")[1]);
          setEndDate(res.data.endDate.split("T")[0]);
          setEndTime(res.data.endDate.split("T")[1]);
          setDetails(res.data.details);
          setLocation(res.data.location);
          setAddress(res.data.address);
          setQuota(res.data.quota);
        })
        .catch((err) => console.log(err));
    }
  }, [props.user, props.update]);

  const emptyCheck = () => {
    let check = 0;

    if (
      name !== "" &&
      organizer !== "" &&
      startDate !== "" &&
      startTime !== "" &&
      endDate !== "" &&
      endTime !== "" &&
      location !== "" &&
      address !== "" &&
      quota !== ""
    ) {
      check = 1;
    }
    return check;
  };

  const getFileName = (fullPath) => {
    return fullPath.replace(/^.*[\\\/]/, "");
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    if (emptyCheck()) {
      const data = {
        name: name,
        organizer: organizer,
        startDate: startDate + "T" + startTime,
        endDate: endDate + "T" + endTime,
        location: location,
        address: address,
        details: details,
        imageURL: getFileName(imageURL),
        quota: quota,
      };

      if (!props.update) {
        axios
          .post(`/admin/${props.user}/events`, data, config)
          .then((res) => {
            setMessage(res.data);
            setSubmitted(true);

            if (res.data.messageType === "SUCCESS") {
              //history.push(`/event/${name}`);
              setAlert(true);
              setTimeout(() => {
                setMessage("");
                setAlert(false);
              }, 2000);
              history.push(`/event/${name}`);
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
          .catch((err) => {
            setSubmitted(true);
            console.log(err);
          });
      } else {
        axios
          .put(`/admin/events/${props.eventName}`, data, config)
          .then((res) => {
            setMessage(res.data);
            setSubmitted(true);

            if (res.data.messageType === "SUCCESS") {
              //history.push(`/event/${name}`);
              setAlert(true);
              setTimeout(() => {
                setMessage("");
                setAlert(false);
              }, 2000);
              history.push(`/event/${name}`);
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
          .catch((err) => {
            setSubmitted(true);
          });
      }
    }
  };

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

  const cardTitle = () => {
    if (props.update) {
      return (
        <CardTitle className={styles.title} tag="h2">
          Update Event
        </CardTitle>
      );
    } else {
      return (
        <CardTitle className={styles.title} tag="h2">
          Add New Event
        </CardTitle>
      );
    }
  };

  if (!props.user || !props.userRole) {
    return <div></div>;
  }

  return (
    <Container className={styles.box}>
      <div className={styles.mainbox}>
        <Card body className={styles.card}>
          {cardTitle()}
          <hr className={styles.hr}></hr>

          <Form className={styles.myForm} onSubmit={handleSubmit}>
            <div className={styles.inputContainer}>
              <Label htmlFor="name" className={styles.icon}>
                Name
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={name}
                className="form-control"
                placeholder="Name"
                minLength="3"
                maxLength="32"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className={styles.inputContainer}>
              <Label htmlFor="organizer" className={styles.icon}>
                Organizer
              </Label>
              <Input
                type="text"
                id="organizer"
                name="organizer"
                value={organizer}
                className="form-control"
                placeholder="Organizer"
                onChange={(e) => setOrganizer(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <div className={styles.inputContainer}>
                <Label htmlFor="startDate" className={styles.icon}>
                  Start Date
                </Label>
                <Input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={startDate}
                  className="form-control"
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div className={styles.inputContainer}>
                <Label htmlFor="startTime" className={styles.icon}>
                  Start Time
                </Label>
                <Input
                  type="time"
                  id="startTime"
                  name="startTime"
                  value={startTime}
                  className="form-control"
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputContainer}>
                <Label htmlFor="endDate" className={styles.icon}>
                  End Date
                </Label>
                <Input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={endDate}
                  className="form-control"
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>

              <div className={styles.inputContainer}>
                <Label htmlFor="endTime" className={styles.icon}>
                  End Time
                </Label>
                <Input
                  type="time"
                  id="endTime"
                  name="endTime"
                  value={endTime}
                  className="form-control"
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.inputContainer}>
              <Label htmlFor="location" className={styles.icon}>
                Location
              </Label>
              <Input
                type="text"
                id="location"
                name="location"
                value={location}
                className="form-control"
                placeholder="Location"
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className={styles.inputContainer}>
              <Label htmlFor="address" className={styles.icon}>
                Address
              </Label>
              <Input
                type="text"
                id="address"
                name="address"
                value={address}
                className="form-control"
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputContainer}>
                <Label htmlFor="image" className={styles.icon}>
                  Image
                </Label>
                <Input
                  type="file"
                  id="image"
                  name="image"
                  value={imageURL}
                  className="form-control"
                  placeholder="Image"
                  onChange={(e) => setImageURL(e.target.value)}
                />
              </div>
              <div className={styles.inputContainer}>
                <Label htmlFor="quota" className={styles.icon}>
                  Quota
                </Label>
                <Input
                  type="number"
                  id="quota"
                  name="quota"
                  value={quota}
                  className="form-control"
                  placeholder="Quota"
                  onChange={(e) => setQuota(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.inputContainer}>
              <Label htmlFor="details" className={styles.icon}>
                Details
              </Label>
              <Input
                type="text"
                id="details"
                name="details"
                value={details}
                className="form-control"
                placeholder="Details"
                onChange={(e) => setDetails(e.target.value)}
              />
            </div>

            <Button className={styles.button}>Add Event</Button>
            {showAlert()}
          </Form>
        </Card>
      </div>
    </Container>
  );
}
