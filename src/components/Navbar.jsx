import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {

  handleLogout = () => {
    localStorage.clear();
    this.props.setUser(null);
  } 

  render() {
    let buttons;
    if (this.props.user) {
      buttons = (
        <ul>
          <li>
            <Link to={"/"} onClick={this.handleLogout}>Logout</Link>
          </li>
        </ul>
      )
    } 
    else {
      buttons = (
        <ul>
          <li>
            <Link to={"/login"}>Login</Link>
          </li>
          <li>
            <Link to={"/signup"}>Sign Up</Link>
          </li>
        </ul>
      );
    }

    return (
      <div>
        <nav>
          <div>
            <Link to={"/"}>Home</Link>
            <div>
              {buttons}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
