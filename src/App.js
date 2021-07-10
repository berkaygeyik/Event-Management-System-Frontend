
import React, {Component} from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from "axios";
import Forgot from "./components/Forgot";

export default class App extends Component {
  state = {};

  componentDidMount = () => {
    
    // This is spesific config code
    // Now, in index.js, Configuring using axios.defaults.headers.common
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    console.log(config)
    console.log("test1")

    axios
      .get("/user", config)
      .then((res) => {this.setUser(res.data);console.log("test2")})
      .catch((err) => console.log("application err"));
    console.log("test3")
  }

  setUser = (user) => {
    this.setState({user: user})
  }


  render (){
    console.log("test4")
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar user={this.state.user} setUser={this.setUser}></Navbar>
          <div>
            <div>
                <Switch>
                  <Route exact path="/" component={() => <Home user={this.state.user}/>}></Route>
                  <Route path="/login" component={() => <Login setUser={this.setUser}/>}></Route>
                  <Route path="/signup" component={SignUp}></Route>
                  <Route path="/forgot" component={Forgot}></Route>
                </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
  
}
