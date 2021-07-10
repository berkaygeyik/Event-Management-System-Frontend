import axios from "axios";
import React, { Component } from "react";
import { ValidationForm, TextInput } from "react-bootstrap4-form-validation";
import { Link, Redirect } from "react-router-dom";

class Forgot extends Component {
  state = {
    email: "",
  };

  emptyCheck = () => {
    let check = 0;

    if (this.state.email !== "") {
      check = 1;
    }
    return check;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.emptyCheck()) {
      const data = {
        email: this.state.email
      };
      /*axios
        .post("/forgot", data)
        .then((res) => {
            console.log(res)
        //   if (res.data.token) {
        //     localStorage.setItem("token", res.data.token);
        //     this.setState({ loggedIn: true });
        //     this.props.setUser(res.data.token);
        //   } else {
        //     console.log("Login failed!");
        //   }

        //   this.setState({
        //     username: "",
        //     password: "",
        //   });
        })
        .catch((err) => console.log(err));*/
    } else {
      console.log("You have to fill in all fields!");
    }
  };

  render() {
    return (
      <ValidationForm onSubmit={this.handleSubmit}>
        <h2>Forgot Password</h2>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <TextInput
            type="email"
            id="email"
            name="email"
            className="form-control"
            placeholder="Email"
            value={this.state.email}
            required
            onChange={(e) => this.setState({ email: e.target.value })}
          />
        </div>

        <button className="btn btn-primary btn-block">Submit</button>
      </ValidationForm>
    );
  }
}

export default Forgot;
