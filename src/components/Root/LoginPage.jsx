import React from "react";
import Login from "../Login/Login";

export default function LoginPage(props) {
  return (
    <div style={{ backgroundImage: "URL('back3.jpg')" }}>
      <Login setUser={props.setUser} setTrigger={props.setTrigger}></Login>
    </div>
  );
}
