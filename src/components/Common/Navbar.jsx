import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navi.module.css";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button,
  Container,
} from "reactstrap";
import {} from "@material-ui/core";

export default function Navbar2(props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    props.setUserRole(localStorage.getItem("userRole"));
  }, [props.userRole]);

  const handleLogout = () => {
    localStorage.clear();
    props.setUser(null);
    props.setUserRole(null);
  };

  const goHome = () => {
    if (!props.userRole) {
      return "/";
    } else if (props.userRole === "admin") {
      return "/home";
    } else if (props.userRole === "user") {
      return "/home";
    }
  };

  const eventButtons = () => {
    if (!props.userRole) {
      return;
    } else if (props.userRole === "admin") {
      return (
        <>
          <Link to={"/addEvent"}>
            <NavItem>
              <Button color="light" className={styles.button3}>
                <i class="fa fa-plus" aria-hidden="true"></i> Add New Event
              </Button>
            </NavItem>
          </Link>
          <Link to={"/myEvents"}>
            <NavItem>
              <Button color="light" className={styles.button3}>
                <i class="fa fa-list" aria-hidden="true"></i> My Events
              </Button>
            </NavItem>
          </Link>
        </>
      );
    } else if (props.userRole === "user") {
      return (
        <>
          <Link to={"/myEvents"}>
            <NavItem>
              <Button color="light" className={styles.button3}>
                <i class="fa fa-list" aria-hidden="true"></i> My Events
              </Button>
            </NavItem>
          </Link>
        </>
      );
    }
  };

  const buttons = () => {
    if (!localStorage.getItem("token")) {
      return (
        <Nav navbar>
          <Link to={"/Login"}>
            <NavItem>
              <Button color="light" className={styles.button}>
                <i className="fa fa-sign-in" aria-hidden="true"></i> Login
              </Button>
            </NavItem>
          </Link>
          <Link to={"/signUp"}>
            <NavItem>
              <Button color="light" className={styles.button}>
                <i className="fa fa-sign-in" aria-hidden="true"></i> Sign Up
              </Button>
            </NavItem>
          </Link>
        </Nav>
      );
    } else {
      return (
        <Nav navbar>
          {eventButtons()}
          <Link to={"/updateUser"}>
            <NavItem>
              <Button color="light" className={styles.button2}>
                <i className="fa fa-user" aria-hidden="true"></i> Update Profile
              </Button>
            </NavItem>
          </Link>
          <Link to={"/"} onClick={handleLogout}>
            <NavItem>
              <Button color="light" className={styles.button}>
                <i className="fa fa-sign-out" aria-hidden="true"></i> Logout
              </Button>
            </NavItem>
          </Link>
        </Nav>
      );
    }
  };

  return (
    <Navbar className={styles.navbar} light expand="md">
      <Container>
        <NavbarBrand className={styles.navbarBrand} href={goHome()}>
          EventFinder
        </NavbarBrand>
        <NavbarToggler onClick={toggle} style={{ backgroundColor: "white" }} />
        <Collapse className={styles.navbarCollapse} isOpen={isOpen} navbar>
          {buttons()}
        </Collapse>
      </Container>
    </Navbar>
  );
}
