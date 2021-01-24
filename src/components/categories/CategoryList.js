import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as categoryActions from "../../redux/actions/categoryActions";
import * as eventActions from "../../redux/actions/eventActions";
import { ListGroup, ListGroupItem } from "reactstrap";

import styles from "./CategoryList.module.css";

class CategoryList extends Component {
  componentDidMount() {
    this.props.actions.getCategories();
  }

  selectCategory = (category) => {
    this.props.actions.changeCategory(category);
    this.props.actions.getEvents(category.id);
  };

  isActive = (categoryId, currentCategoryId) => {
    if (categoryId === currentCategoryId) {
      return "rgb(240, 140, 60)";
    }
  };

  render() {
    return (
      <div>
        <ListGroup style={{ boxShadow: "5px 5px 5px gray" }}>
          <a href="/">
            <ListGroupItem className={styles.listGroupFirst}>
              All Categories
            </ListGroupItem>
          </a>
          {this.props.categories.map((category) => (
            <ListGroupItem
              action
              variant="success"
              className={styles.listGroupItem}
              style={{
                backgroundColor: this.isActive(
                  category.id,
                  this.props.currentCategory.id
                ),
                borderColor: "lightGray",
              }}
              active={category.id === this.props.currentCategory.id}
              onClick={() => this.selectCategory(category)}
              key={category.id}
            >
              <div>{category.categoryName}</div>
              <div>
                <i className="fa fa-arrow-right" aria-hidden="true"></i>
              </div>
            </ListGroupItem>
          ))}
        </ListGroup>
        {/* <h5>Selected: {this.props.currentCategory.categoryName} </h5> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentCategory: state.changeCategoryReducer,
    categories: state.categoryListReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getCategories: bindActionCreators(
        categoryActions.getCategories,
        dispatch
      ),
      changeCategory: bindActionCreators(
        categoryActions.changeCategory,
        dispatch
      ),
      getEvents: bindActionCreators(
        eventActions.getEvents,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
