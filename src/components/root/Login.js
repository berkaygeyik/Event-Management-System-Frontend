import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import CategoryList from "../categories/CategoryList";
import Login from "../loginSignUp/loginSignUpTab";
import SignUp from "../loginSignUp/SignUp";

export default class LoginSignUp extends Component {
  render() {
    return (
      <div>
        
        <Row>
          <Col xs="12">
            <Login />
          </Col>
        </Row>
      </div>
    );
  }
}
