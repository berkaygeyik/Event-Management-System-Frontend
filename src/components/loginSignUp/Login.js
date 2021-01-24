import React, { Component } from "react";
import { Row, Col, Container, Card, CardTitle, CardText, Button, FormGroup, Label, Input } from "reactstrap";

import styles from "./loginSignUp.module.css";

class Login extends Component {
  isActive = () => {};

  render() {
    return (
      
        <Container className={styles.box}>
            <div className={styles.mainbox}>
            <Card body>
            <CardTitle tag="h2">Login</CardTitle>
            <hr></hr>
            <FormGroup>
                <Label for="exampleEmail">Email Adreess</Label>
                <Input type="email" name="email" id="exampleEmail" placeholder="Enter Your Email Adress" />
            </FormGroup>
            <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input type="password" name="password" id="examplePassword" placeholder="Enter Your Password" />
            </FormGroup>
            <FormGroup check>
                <Label check>
                <Input type="checkbox" />{' '}
                Remember Me
                </Label>
            </FormGroup>
            <Button className={styles.loginButton}>Login</Button>
            </Card>
            </div>
        </Container>
    );
  }
}

export default Login;
