import React, { Component } from "react";
import { Row, Col, Container, Card, CardTitle, CardText, Button, FormGroup, Label, Input } from "reactstrap";

import styles from "./loginSignUp.module.css";

class SignUp extends Component {
  isActive = () => {};

  render() {
    return (
      
        <Container className={styles.box}>
            <div className={styles.mainbox}>
            <Card body>
            <CardTitle tag="h2">Sign Up</CardTitle>
            <hr></hr>
            <FormGroup>
                <Label for="name">Name</Label>
                <Input type="text" name="name" id="name" placeholder="Enter Your Name"/>
            </FormGroup>
            <FormGroup>
                <Label for="surname">Surname</Label>
                <Input type="text" name="surname" id="surname" placeholder="Enter Your Surname"/>
            </FormGroup>
            <FormGroup>
                <Label for="exampleEmail">Email Adreess</Label>
                <Input type="email" name="email" id="exampleEmail" placeholder="Enter Your Email Adress" />
            </FormGroup>
            <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="password" placeholder="Enter Your Password" />
            </FormGroup>
            <FormGroup>
                <Label for="passwordRepeat">Password (repeat)</Label>
                <Input type="password" name="passwordRepeat" id="passwordRepeat" placeholder="Enter Your Password Again" />
            </FormGroup>
            <FormGroup check>
                <Label check>
                <Input type="checkbox" />{' '}
                I have read and accept the terms of the Membership Agreement.
                </Label>
            </FormGroup>
            <FormGroup check>
                <Label check>
                <Input type="checkbox" />{' '}
                I consent to be contacted by me for marketing and promotional purposes.
                </Label>
            </FormGroup>
            <Button className={styles.loginButton}>Login</Button>
            </Card>
            </div>
        </Container>
    );
  }
}

export default SignUp;
