import React, { Component, useState, useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from "axios";
import Forgot from "./components/Forgot";
import LandingPage from "./components/Root/LandingPage";
import HomePage from "./components/Root/HomePage";
import AdminPage from "./components/Root/AdminPage";
import LoginPage from "./components/Root/LoginPage";
import SignUpPage from "./components/Root/SignUpPage";
import Navbar2 from "./components/Common/Navbar";
import styles from "./App.module.css";
import Profile from "./components/Root/Profile";
function App() {
  const [user, setUser] = useState("");
  const [userRole, setUserRole] = useState("");
  const [trigger, setTrigger] = useState("");

  useEffect(() => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    setUser(localStorage.getItem("username"));
    if (user) {
      axios
        .get(`/user/profile/${user}`, config)
        .then((res) => {
          setUserRole(res.data.userRole)
          localStorage.setItem("userRole", res.data.userRole)
        })
        .catch((err) => console.log(err));
    }
  }, [trigger]);

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar2 userRole={userRole} setUserRole={setUserRole} setUser={setUser} ></Navbar2>
        <div>
          <div>
            <Switch>
              <Route
                exact
                path="/"
                component={() => <LandingPage />}
              ></Route>
              <Route path="/home" component={() => <HomePage user={user} />}></Route>
              <Route path="/admin" component={() => <AdminPage />}></Route>
              <Route
                path="/login"
                component={() => (
                  <LoginPage setTrigger={setTrigger} setUser={setUser} />
                )}
              ></Route>
              <Route path="/signup" component={() => <SignUpPage />}></Route>
              <Route path="/profile" component={() => <Profile />}></Route>
            </Switch>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
