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
    } 
    else if (props.userRole === "admin") {
      return "/home"
    } 
    else if (props.userRole === "user") {
      return "/home"
    }
  };

  const buttons = () => {
    if (!localStorage.getItem("token")) {
      return (
        <Nav navbar>
          {/* <UncontrolledDropdown
            nav
            inNavbar
            className={styles.uncontrolledDropdown}
          >
            <DropdownToggle nav className={styles.dropdownToggle}>
              <Button color="light" className={styles.button}>
                <i className="fa fa-user" aria-hidden="true"></i> Profile{" "}
                <i className="fa fa-caret-down" aria-hidden="true"></i>
              </Button>
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem className={styles.dropdownItem}>
                <i className="fa fa-plus" aria-hidden="true"></i> Add Events
              </DropdownItem>
              <DropdownItem className={styles.dropdownItem}>
                <i className="fa fa-calendar" aria-hidden="true"></i> My
                Events
              </DropdownItem>
              <DropdownItem className={styles.dropdownItem}>
                <i className="fa fa-cog" aria-hidden="true"></i> Profile
                Settings
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem className={styles.dropdownItem}>
                <i className="fa fa-sign-out" aria-hidden="true"></i> Log Out
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown> */}
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
          <Link to={"/Login"}>
            <NavItem>
              <Button color="light" className={styles.button2}>
                <i class="fa fa-user" aria-hidden="true"></i> My Profile
              </Button>
            </NavItem>
          </Link>
          <Link to={"/"} onClick={handleLogout}>
            <NavItem>
              <Button color="light" className={styles.button}>
                <i class="fa fa-sign-out" aria-hidden="true"></i> Logout
              </Button>
            </NavItem>
          </Link>
        </Nav>
      );
    }
  };

  // let buttons;
  // if (localStorage.getItem("token")) {
  //   buttons = (
  //     <ul>
  //       <li>
  //         <Link to={"/"} onClick={handleLogout}>
  //           Logout
  //         </Link>
  //       </li>
  //     </ul>
  //   );
  // } else {
  //   buttons = (
  //     <ul>
  //       <li>
  //         <Link to={"/login"}>Login</Link>
  //       </li>
  //       <li>
  //         <Link to={"/signup"}>Sign Up</Link>
  //       </li>
  //     </ul>
  //   );
  // }

  return (
    // <div>
    //   <nav>
    //     <div>
    //       {goHome()}
    //       <div>{buttons}</div>
    //     </div>
    //   </nav>
    // </div>

    <Navbar className={styles.navbar} light navbar-fixed-top expand="md">
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
