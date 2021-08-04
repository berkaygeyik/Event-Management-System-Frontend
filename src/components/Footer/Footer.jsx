import React from "react";
import { Row, Col, Container } from "reactstrap";

import styles from "./Footer.module.css";

export default function Footer(props) {

    const goHome = () => {
        if (!props.userRole) {
          return "/";
        } else if (props.userRole === "admin") {
          return "/home";
        } else if (props.userRole === "user") {
          return "/home";
        }
      };

    return (
        <footer className={styles.footer}>
          <Container>
            <div className={styles.footerTop}>
              <h2 className={styles.footerTopBrand}>EventFinder</h2>
              <div className={styles.footerTop}>
                <div className={styles.footerTopRight}>MyEvents </div>
                <div className={styles.footerTopRight}> | </div>
                <div className={styles.footerTopRight}> Contact us</div>
              </div>
            </div>
  
            {/* <Row>
              <Col xs="4">
                <div className={styles.footerBottomHead}>EventFinder</div>
                <div className={styles.footerBottomElement}>HomePage</div>
                <div className={styles.footerBottomElement}>Specifications</div>
                <div className={styles.footerBottomElement}>About</div>
                <div className={styles.footerBottomElement}>Privacy Policy</div>
                <div className={styles.footerBottomElement}>Terms of Use</div>
              </Col>
              <Col xs="4">
                <div className={styles.footerBottomHead}>Explore</div>
                <div className={styles.footerBottomElement}>Events</div>
                <div className={styles.footerBottomElement}>Joined Events</div>
                <div className={styles.footerBottomElement}>Categories</div>
              </Col>
              <Col xs="4">
                <div className={styles.footerBottomHead}>Contact</div>
                <div className={styles.footerBottomElement}>Twitter</div>
                <div className={styles.footerBottomElement}>Facebook</div>
                <div className={styles.footerBottomElement}>Github</div>
                <div className={styles.footerBottomElement}>Contact</div>
              </Col>
            </Row> */}
          </Container>
        </footer>
      );
    }
