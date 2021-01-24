import React, { useState } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
} from "reactstrap";
import classnames from "classnames";
import EventDetails from "../eventDetails/EventDetails";

import styles from "./EventDashboard.module.css";
import Participants from "../participants/Participants";

const EventDashboard = (props) => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div>
      <Nav tabs>
        <NavItem className={styles.tabs}>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1");
            }}
          >
            <i className="fa fa-info-circle" aria-hidden="true"></i> Event
            Details
          </NavLink>
        </NavItem>
        <NavItem className={styles.tabs}>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            <i className="fa fa-user-circle-o" aria-hidden="true"></i>{" "}
            Participants
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <EventDetails />
        </TabPane>
        <TabPane tabId="2">
          <Participants />
        </TabPane>
      </TabContent>
    </div>
  );
};

export default EventDashboard;
