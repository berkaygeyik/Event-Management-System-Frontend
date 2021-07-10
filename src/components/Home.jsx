import React, { Component } from "react";

export default class Home extends Component {
  render() {
    if(this.props.user){
      return (
        <h2> {this.props.user} </h2>
      )
    }

    return (
      <div>
        <h2>You are not logged in!</h2>
      </div>
    );
  }
}
