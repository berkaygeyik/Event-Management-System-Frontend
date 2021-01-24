import React from "react";
import { Container, Row, Col } from "reactstrap";
import Navi from "../navi/Navi";
import Dashboard from "./Dashboard";
import Eventboard from "./Eventboard";
import Login from "./Login";
import Footer from "../footer/Footer";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import { Switch, Route } from "react-router-dom";
function App() {
  return (
    <div>
      <Navi />
      <Container>
        <Row  style={{marginBottom:0}}>
          <Col  xs="12">
            <Breadcrumbs  />
          </Col>
        </Row>
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/event" exact component={Eventboard} />
          <Route path="/login" exact component={Login} />
        </Switch>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
