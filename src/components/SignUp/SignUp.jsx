import React, { useState } from "react";
import axios from "axios";
import { ValidationForm, TextInput } from "react-bootstrap4-form-validation";
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
} from "reactstrap";
import Alert from "@material-ui/lab/Alert";
import styles from "./SignUp.module.css";
import { Redirect, useHistory } from "react-router-dom";

export default function SignUp(props) {
  const history = useHistory();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [tcIdentificationNumber, setTcIdentificationNumber] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("user");

  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState("");

  const [visible, setVisible] = useState(true);
  const onDismiss = () => setVisible(false);

  const emptyCheck = () => {
    let check = 0;

    if (
      name !== "" &&
      surname !== "" &&
      tcIdentificationNumber !== "" &&
      email !== "" &&
      username !== "" &&
      password !== ""
    ) {
      check = 1;
    }
    return check;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emptyCheck()) {
      const data = {
        name: name,
        surname: surname,
        tcIdentificationNumber: tcIdentificationNumber,
        email: email,
        username: username,
        password: password,
      };
      console.log(userType);
      axios
        .post(`/register/${userType}`, data)
        .then((res) => {
          setMessage(res.data);
          setSubmitted(true);
          if (res.data.messageType === "SUCCESS") {
            history.push("/login");
          }
        })
        .catch((err) => {
          setSubmitted(true);
          console.log(err);
        });

      setName("");
      setSurname("");
      setTcIdentificationNumber("");
      setEmail("");
      setUsername("");
      setPassword("");
    } else {
      console.log("You have to fill in all fields!");
    }
  };

  const showAlert = () => {
    if (submitted && message) {
      if (message.messageType === "ERROR") {
        return <Alert severity="error">{message.message}</Alert>;
      }
      if (message.messageType === "SUCCESS") {
        return <Alert severity="success">{message.message}</Alert>;
      }
    }
    if (submitted && !message) {
      return (
        <Alert severity="error">
          TC Identification Number, Username and Email must be unique.
        </Alert>
      );
    }
  };

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
          <CardTitle tag="h2">Sign Up</CardTitle>
          <hr className={styles.hr}></hr>
          <ValidationForm className={styles.myForm} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              {/* <Label for="name" className={styles.icon}>
              Name
            </Label> */}
              <div className={styles.inputContainer}>
                <TextInput
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  placeholder="Name"
                  value={name}
                  minLength="3"
                  maxLength="32"
                  pattern="([A-Za-z üiöğçşıİÇŞÜÖĞ]*)"
                  required
                  errorMessage={{
                    minLength: "Please enter at least 3 characters!",
                    pattern: "Please enter a acceptable name!",
                  }}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* <Label for="surname" className={styles.icon}>
              Surname
            </Label> */}
              <div className={styles.inputContainer}>
                <TextInput
                  type="text"
                  id="surname"
                  name="surname"
                  className="form-control"
                  placeholder="Surname"
                  value={surname}
                  minLength="3"
                  maxLength="32"
                  pattern="([A-Za-z üiöğçşıİÇŞÜÖĞ]*)"
                  required
                  errorMessage={{
                    minLength: "Please enter at least 3 characters!",
                    pattern: "Please enter a acceptable name!",
                  }}
                  onChange={(e) => setSurname(e.target.value)}
                />
              </div>
            </div>

            {/* <Label for="tcIdentificationNumber" className={styles.icon}>
              TC Identification Number
            </Label> */}
            <div className={styles.inputContainer}>
              <TextInput
                type="text"
                id="tcIdentificationNumber"
                name="tcIdentificationNumber"
                className="form-control"
                placeholder="TC Identification Number"
                value={tcIdentificationNumber}
                minLength="11"
                maxLength="11"
                pattern="([0-9]*)"
                required
                errorMessage={{
                  minLength: "This is not a valid TC Identification Number",
                  maxLength: "This is not a valid TC Identification Number",
                }}
                onChange={(e) => setTcIdentificationNumber(e.target.value)}
              />
            </div>

            {/* <Label for="email" className={styles.icon}>
              Email
            </Label> */}
            <div className={styles.inputContainer}>
              <TextInput
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="Email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* <Label for="username" className={styles.icon}>
              Username
            </Label> */}
            <div className={styles.inputGroup}>
              <div className={styles.inputContainer}>
                <TextInput
                  type="text"
                  id="username"
                  name="username"
                  className="form-control"
                  placeholder="Username"
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

              {/* <Label for="password" className={styles.icon}>
              Password
            </Label> */}
              <div className={styles.inputContainer}>
                <TextInput
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
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
            </div>

            <Label for="password" className={styles.icon}>
              Register as a User or an Admin.
            </Label>
            <div className={styles.inputContainer}>
              <Input
                type="select"
                name="select"
                id="select"
                className="form-control"
                placeholder="User Type"
                onChange={(e) => setUserType(e.target.value)}
              >
                <option>user</option>
                <option>admin</option>
              </Input>
            </div>

            <Button className={styles.button}>SignUp</Button>
            {showAlert()}
            {/* <div >
              <Link to="/forgot">Forgot Password?</Link>
            </div> */}
          </ValidationForm>
        </Card>
      </div>
    </Container>
  );
}
