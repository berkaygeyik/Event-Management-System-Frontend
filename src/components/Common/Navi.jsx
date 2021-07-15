import React, { useState } from "react";
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
import { Link } from "react-router-dom";
// import cn from "classnames";

import styles from "./Navi.module.css";


const Navi = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className={styles.completeOfBar}>
      <Container>
        <Navbar className={styles.navbar} navbar-fixed-top light expand="md">
          <NavbarBrand className={styles.navbarBrand} href="/">
            EventFinder
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              {/* <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">
                GitHub
              </NavLink>
            </NavItem> */}
            </Nav>
            {/* <NavbarText>Simple Text</NavbarText> */}
            <Nav navbar>
              <UncontrolledDropdown
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
                    <i className="fa fa-sign-out" aria-hidden="true"></i> Log
                    Out
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <Link to={"/Login"}>
              <NavItem>
                <Button color="dark" className={styles.button}>
                  <i className="fa fa-sign-in" aria-hidden="true"></i> Login
                </Button>
              </NavItem>
              </Link>
              <Link to={"/Login"}>
              <NavItem>
                <Button color="dark" className={styles.button}>
                  <i className="fa fa-sign-in" aria-hidden="true"></i> Sign Up
                </Button>
              </NavItem>
              </Link>
            </Nav>
          </Collapse>
        </Navbar>
      </Container>
    </div>
  );
};

export default Navi;