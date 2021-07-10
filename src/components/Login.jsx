import React, { Component } from "react";
import axios from "axios";
import { ValidationForm, TextInput } from "react-bootstrap4-form-validation";
import { Link, Redirect } from "react-router-dom";

export default class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  emptyCheck = () => {
    let check = 0;

    if (this.state.username !== "" && this.state.password !== "") {
      check = 1;
    }
    return check;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.emptyCheck()) {
      const data = {
        username: this.state.username,
        password: this.state.password,
      };
      axios
        .post("/login", data)
        .then((res) => {
          if(res.data.token){
            localStorage.setItem("token", res.data.token) 
            this.setState({loggedIn: true});
            this.props.setUser(res.data.token)
          }
          else {
            console.log("Login failed!")
          }

          this.setState({
            username: "",
            password: "",
          });
        })
        .catch((err) => console.log(err));
      
    } else {
      console.log("You have to fill in all fields!");
    }
  };

  render() {

    if (this.state.loggedIn){
      return <Redirect to={"/"} ></Redirect>
    }

    return (
      <ValidationForm onSubmit={this.handleSubmit}>
        <h2>This is Login Page!</h2>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <TextInput
            type="text"
            id="username"
            name="username"
            className="form-control"
            placeholder="Username"
            value={this.state.username}
            minLength="3"
            maxLength="32"
            required
            successMessage="Looks good!"
            errorMessage={{
              minLength: "Please enter at least 3 characters!",
            }}
            onChange={(e) => this.setState({ username: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <TextInput
            type="password"
            id="password"
            name="password"
            className="form-control"
            placeholder="Password"
            value={this.state.password}
            minLength="8"
            maxLength="32"
            required
            successMessage="Looks good!"
            errorMessage={{
              minLength: "Please enter at least 8 characters!",
            }}
            onChange={(e) => this.setState({ password: e.target.value })}
          />
        </div>

        <button className="btn btn-primary btn-block">Login</button>
        <p className="forgot-password text-right"><Link to="/forgot">Forgot Password?</Link></p>
      </ValidationForm>
    );
  }
}
