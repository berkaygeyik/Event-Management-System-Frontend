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
import EventPage from "./components/Root/EventPage";
import MyEventsPage from "./components/Root/MyEventsPage";
import Navbar2 from "./components/Common/Navbar";
import styles from "./App.module.css";
import Profile from "./components/Root/Profile";
import AddEventPage from "./components/Root/AddEventPage";
function App() {
  const [user, setUser] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userNameSurname, setUserNameSurname] = useState("");
  const [userData, setUserData] = useState("");
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
          setUserRole(res.data.userRole);
          setUserNameSurname(res.data.name + " " + res.data.surname);
          localStorage.setItem("userRole", res.data.userRole);
          localStorage.setItem(
            "userNameSurname",
            res.data.name + " " + res.data.surname
          );
          
        })
        .catch((err) => console.log(err));
    }
  }, [trigger]);

  const stringToDate = (date) => {
    return new Date(date);
  };

  const checkAndAddZero = (datePart) => {
    if (datePart / 10 < 1) {
      return "0" + datePart;
    }
    return datePart;
  };

  const getDate = (date) => {
    const dateObj = stringToDate(date);
    const day = checkAndAddZero(dateObj.getUTCDate());
    const month = checkAndAddZero(dateObj.getUTCMonth() + 1); //months from 1-12
    const year = checkAndAddZero(dateObj.getUTCFullYear());
    const hours = checkAndAddZero(dateObj.getHours());
    const minutes = checkAndAddZero(dateObj.getMinutes());

    return day + "/" + month + "/" + year + " - " + hours + ":" + minutes;
  };
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar2
          userRole={userRole}
          setUserRole={setUserRole}
          setUser={setUser}
        ></Navbar2>
        <div>
          <div>
            <Switch>
              <Route exact path="/" component={() => <LandingPage />}></Route>
              <Route path="/home" component={() => <HomePage getDate={getDate} user={user} />}></Route>
              <Route path="/admin" component={() => <AdminPage />}></Route>
              <Route path="/myEvents" component={() => ( <MyEventsPage getDate={getDate} user={user} userRole={userRole}/>)}/>
              <Route path="/login" component={() => ( <LoginPage setTrigger={setTrigger} setUser={setUser} />)} ></Route>
              <Route path="/signup" component={() => <SignUpPage />}></Route>
              <Route path="/updateUser" component={() => <SignUpPage  user={user} setUser={setUser} update={true} userRole={userRole} />}></Route>
              <Route path="/profile" component={() => <Profile />}></Route>
              <Route path="/addEvent" component={() => ( <AddEventPage user={user} userRole={userRole} /> )} ></Route>
              <Route path="/event/:eventName" render={(props) => <EventPage getDate={getDate} {...props} />}/>
              <Route path="/updateEvent/:eventName" render={(props) => (<AddEventPage user={user} update={true} userRole={userRole} {...props} />)}/>
            </Switch>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
