import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as eventActions from "../../redux/actions/eventActions";
import {
  Badge,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import styles from "./EventList.module.css";
import searchBarStyles from "./SearchBar.module.css";
import { Link } from "react-router-dom";

const defaultImage =
  "https://www.beyhanbudak.com.tr/wp-content/uploads/2017/08/TED-Talks.png";
let rowsCardNum = 3;

const useStateWithLocalStorage = localStorageKey => {
  const [value, setValue] = React.useState(
    localStorage.getItem(localStorageKey) || ''
  );
 
  React.useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value]);
 
  return [value, setValue];
};


class EventList extends Component {
  state = {
    searchInputValue: "",
  };
  componentDidMount() {
    this.props.actions.getEvents();
  }

  changeCurrentEvent = (event) => {
    this.props.actions.getCurrentEvent(event);
  };
  eventCard = (event) => {
    if (
      this.state.searchInputValue !== "" &&
      event.name
        .toLowerCase()
        .indexOf(this.state.searchInputValue.toLowerCase()) === -1
    ) {
      return null;
    }
    // if(event.name.toLowerCase().indexOf(searchInputValue) !== -1){
    //   displayCard="block";
    // }
    // else {
    //   return null;
    // }

    return (
        <Col key={event.id}  onClick={() => this.changeCurrentEvent(event)}>
          <Link to={"/event"}>
          <Card className={styles.card}>
            <CardImg
              top
              width="100%"
              height="200px"
              src={event.image === "" ? defaultImage : event.image}
              alt="Card image cap"
            />
            <CardBody className={styles.cardBody}>
              <div>
                <CardTitle className={styles.cardTitle}>{event.name}</CardTitle>
                <CardSubtitle className={styles.cardSubtitle}>
                  <i className="fa fa-user-circle-o" aria-hidden="true"></i>{" "}
                  {event.organizator}
                </CardSubtitle>
              </div>
              <div>
                <CardText>
                  <i className="fa fa-calendar" aria-hidden="true"></i>{" "}
                  {event.date.start}
                </CardText>
                <div className={styles.flexRow}>
                  <CardText>
                    <Badge className={styles.location}>
                      <i className="fa fa-map-marker" aria-hidden="true"></i>{" "}
                      {event.location}
                    </Badge>
                  </CardText>
                  <CardText>
                    <Badge className={styles.participantsNum}>
                      <i className="fa fa-users" aria-hidden="true"></i>{" "}
                      {event.numberOfParticipants} participiants
                    </Badge>
                  </CardText>
                </div>
              </div>
            </CardBody>
          </Card>
          </Link>
        </Col>
        
    );
  };
  editSearchInput = (event) => {
    this.setState({ searchInputValue: event.target.value });
    this.render();
  };
  searchBar = () => {
    return (
      <div>
        <Form className={searchBarStyles.form}>
          <FormGroup row>
            <Label className={searchBarStyles.label} for="text" xs={1}>
              Search <i className="fa fa-search" aria-hidden="true"></i>
            </Label>
            <Col className={searchBarStyles.bar} xs={11}>
              <Input
                onChange={(event) => this.editSearchInput(event)}
                className={searchBarStyles.input}
                type="text"
                name="text"
                id="text"
                placeholder="Enter a search key..."
              />
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  };
  render() {
    return (
      <div>
        <div>
          {this.searchBar()}
          <h2 className={styles.eventTitle}>
            <Badge style={{ backgroundColor: "rgb(240, 140, 60)" }}>
              {" "}
              {this.props.currentCategory.categoryName
                ? this.props.currentCategory.categoryName + " Events"
                : "All Events"}
            </Badge>
          </h2>
        </div>
        <Row className={styles.rowDashboard} xs={rowsCardNum}>
          {this.props.events.map((event) => this.eventCard(event))}
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentCategory: state.changeCategoryReducer,
    events: state.eventListReducer,
    currentEvent: state.eventPageReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getEvents: bindActionCreators(eventActions.getEvents, dispatch),
      getCurrentEvent: bindActionCreators(
        eventActions.getCurrentEvent,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventList);
