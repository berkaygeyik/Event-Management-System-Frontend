import React, { Component } from "react";
import axios from "axios";
import { ValidationForm, TextInput } from "react-bootstrap4-form-validation";

export default class SignUp extends Component {
  state = {
    name: "",
    surname: "",
    tcIdentificationNumber: "",
    email: "",
    username: "",
    password: "",
  };

  emptyCheck = () => {
    let check = 0;

    if (
      this.state.name !== "" &&
      this.state.surname !== "" &&
      this.state.tcIdentificationNumber !== "" &&
      this.state.email !== "" &&
      this.state.username !== "" &&
      this.state.password !== ""
    ) {
      check = 1;
    }
    return check;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.emptyCheck()) {
      const data = {
        name: this.state.name,
        surname: this.state.surname,
        tcIdentificationNumber: this.state.tcIdentificationNumber,
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
      };

      axios
        .post("/addUser", data)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

        this.setState({ name: "",
        surname: "",
        tcIdentificationNumber: "",
        email: "",
        username: "",
        password: "" })

    } else {
      console.log("You have to fill in all fields!");
    }
  };

  render() {
    return (
      <ValidationForm onSubmit={this.handleSubmit}>
        <h2>This is Sign Up Page!</h2>

        {/* <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            placeholder="Name"
            minLength="3"
            maxLength="32"
            pattern="([A-Za-z üiöğçşıİÇŞÜÖĞ]*)"
            required
            onChange={(e) => this.setState({ name: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="surname">Surname</label>
          <input
            type="text"
            id="surname"
            name="surname"
            className="form-control"
            placeholder="Surname"
            minLength="3"
            maxLength="32"
            pattern="([A-Za-z üiöğçşıİÇŞÜÖĞ]*)"
            required
            onChange={(e) => this.setState({ surname: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="tcIdentificationNumber">
            TC Identification Number
          </label>
          <input
            type="text"
            id="tcIdentificationNumber"
            name="tcIdentificationNumber"
            className="form-control"
            placeholder="TC Identification Number"
            minLength="11"
            maxLength="11"
            pattern="([0-9]*)"
            required
            onChange={(e) =>
              this.setState({ tcIdentificationNumber: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            placeholder="Email"
            required
            onChange={(e) => this.setState({ email: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control"
            placeholder="Username"
            minLength="3"
            maxLength="32"
            required
            onChange={(e) => this.setState({ username: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            placeholder="Password"
            minLength="8"
            maxLength="32"
            required
            onChange={(e) => this.setState({ password: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="form-control"
            placeholder="Confirm Password"
            minLength="8"
            maxLength="32"
            required
            onChange={(e) => this.setState({ password: e.target.value })}
          />
        </div> */}


        <div className="form-group">
          <label htmlFor="name">Name</label>
          <TextInput
            type="text"
            id="name"
            name="name"
            className="form-control"
            placeholder="Name"
            value={this.state.name}
            minLength="3"
            maxLength="32"
            pattern="([A-Za-z üiöğçşıİÇŞÜÖĞ]*)"
            required
            successMessage="Looks good!"
            errorMessage={{
              minLength: "Please enter at least 3 characters!",
              pattern: "Please enter a acceptable name!",
            }}
            onChange={(e) => this.setState({ name: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="surname">Surname</label>
          <TextInput
            type="text"
            id="surname"
            name="surname"
            className="form-control"
            placeholder="Surname"
            value={this.state.surname}
            minLength="3"
            maxLength="32"
            pattern="([A-Za-z üiöğçşıİÇŞÜÖĞ]*)"
            required
            successMessage="Looks good!"
            errorMessage={{
              minLength: "Please enter at least 3 characters!",
              pattern: "Please enter a acceptable name!",
            }}
            onChange={(e) => this.setState({ surname: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="tcIdentificationNumber">
            TC Identification Number
          </label>
          <TextInput
            type="text"
            id="tcIdentificationNumber"
            name="tcIdentificationNumber"
            className="form-control"
            placeholder="TC Identification Number"
            value={this.state.tcIdentificationNumber}
            minLength="11"
            maxLength="11"
            pattern="([0-9]*)"
            required
            successMessage="Looks good!"
            errorMessage={{
              minLength: "This is not a valid TC Identification Number",
              maxLength: "This is not a valid TC Identification Number",
            }}
            onChange={(e) =>
              this.setState({ tcIdentificationNumber: e.target.value })
            }
          />
        </div>

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

        {/* <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <TextInput
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="form-control"
            placeholder="Confirm Password"
            minLength="8"
            maxLength="32"
            required
            successMessage="Looks good!"
            errorMessage={{
              minLength: "Please enter at least 8 characters!",
            }}
            onChange={(e) => this.setState({ password: e.target.value })}
          />
        </div> */}

        <button className="btn btn-primary btn-block">Sign Up</button>
      </ValidationForm>
    );
  }
}
