import React, { Component } from "react";

export default function Home(props) {
  
  if (props.user) {
    return <h2> {props.user} </h2>;
  }

  return (
    <div>
      <h2>You are not logged in!</h2>
    </div>
  );
}
