import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { ValidationForm, TextInput } from "react-bootstrap4-form-validation";
import { Link, Redirect } from "react-router-dom";
import styles from "./Login.module.css";
import {
  Button,
  Card,
  CardTitle,
  Container,
  FormGroup,
  Input,
  Label,
  CardImg,
} from "reactstrap";

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState();

  const emptyCheck = () => {
    let check = 0;

    if (username !== "" && password !== "") {
      check = 1;
    }
    return check;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emptyCheck()) {
      const data = {
        username: username,
        password: password,
      };
      axios
        .post("/login", data)
        .then((res) => {
          if (res.data.token) {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("username", data.username);
            setLoggedIn(true);
            props.setUser(username);
            props.setTrigger(res.data.token);
          } else {
            console.log("Login failed!");
          }
          setUsername("");
          setPassword("");
        })
        .catch((err) => console.log(err));
    } else {
      console.log("You have to fill in all fields!");
    }
  };

  if (loggedIn) {
    console.log("logged in");
    return <Redirect to={"/home"}></Redirect>;
  }

  return (
    <Container className={styles.box}>
      <div className={styles.mainbox}>
        <Card body className={styles.card}>
          <CardImg
            top
            className={styles.cardImage}
            src="/user.png"
            alt="User Icon"
          />
          <CardTitle tag="h2">Login</CardTitle>
          <hr className={styles.hr}></hr>
          <ValidationForm className={styles.myForm} onSubmit={handleSubmit}>
            <Label for="username" className={styles.icon}>
              <i className="fa fa-user icon"></i> Username
            </Label>
            <div className={styles.inputContainer}>
              <TextInput
                type="text"
                id="username"
                name="username"
                className="form-control"
                placeholder="Enter your username"
                value={username}
                minLength="3"
                maxLength="32"
                required
                errorMessage={{
                  minLength: "Please enter at least 3 characters!",
                }}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <Label for="password" className={styles.icon}>
              <i className="fa fa-unlock-alt"></i> Password
            </Label>
            <div  className={styles.inputContainer}>
              <TextInput
                type="password"
                id="password"
                name="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                minLength="8"
                maxLength="32"
                required
                errorMessage={{
                  minLength: "Please enter at least 8 characters!",
                }}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" /> Remember Me
              </Label>
            </FormGroup>
            <Button className={styles.button}>Login</Button>
            {/* <div >
              <Link to="/forgot">Forgot Password?</Link>
            </div> */}
          </ValidationForm>
        </Card>
      </div>
    </Container>
    
  );
}
