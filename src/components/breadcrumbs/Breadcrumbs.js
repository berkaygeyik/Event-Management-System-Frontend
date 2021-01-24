import React, { Component } from "react";
import { connect } from "react-redux";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { bindActionCreators } from "redux";
import * as categoryActions from "../../redux/actions/categoryActions";

import styles from "./Breadcrumbs.module.css";

class Breadcrumbs extends Component {
  componentDidMount() {
    this.props.actions.getCategories();
  }

  selectCategory = () => {
    let categoryName;
    this.props.categories.map(
      (category) =>
        (category.id === this.props.currentEvent.categoryId)? categoryName = category.categoryName: null
    );
    return categoryName;
  };

  showBreadcrumb = (homePage, categoryPage, eventPage) => {
    //console.log(categoryPage + " " + eventPage)
    if (!categoryPage) {
      return (
        <Breadcrumb className={styles.breadcrumb}>
          <BreadcrumbItem>{homePage}</BreadcrumbItem>
        </Breadcrumb>
      );
    } else if (categoryPage && !eventPage) {
      return (
        <Breadcrumb className={styles.breadcrumb}>
          <BreadcrumbItem>{homePage}</BreadcrumbItem>
          <BreadcrumbItem>{categoryPage}</BreadcrumbItem>
        </Breadcrumb>
      );
    }
    return (
      <Breadcrumb className={styles.breadcrumb}>
        <BreadcrumbItem>{homePage}</BreadcrumbItem>
        <BreadcrumbItem>{categoryPage}</BreadcrumbItem>
        <BreadcrumbItem>{eventPage}</BreadcrumbItem>
      </Breadcrumb>
    );
  };

  render() {
    let homePage = <a href="/">Events</a>;
    let categoryPage = this.props.currentCategory.categoryName;
    console.log(this.props)
    let selectedCategory = this.selectCategory();
    if (selectedCategory) {
      categoryPage = selectedCategory;
    }
    let eventPage = this.props.currentEvent.name;
    return this.showBreadcrumb(homePage, categoryPage, eventPage);

    // if (!categoryPage) {
    //   return this.showBreadcrumb(homePage, categoryPage, eventPage);
    // } else if (categoryPage && !eventPage) {
    //   return this.showBreadcrumb(homePage);
    // }
    // return this.showBreadcrumb(homePage), this.showBreadcrumb(categoryPage);
  }
}

function mapStateToProps(state) {
  return {
    currentCategory: state.changeCategoryReducer,
    categories: state.categoryListReducer,
    currentEvent: state.eventPageReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getCategories: bindActionCreators(
        categoryActions.getCategories,
        dispatch
      ),
      getEvents: bindActionCreators(
        categoryActions.getCategories,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Breadcrumbs);
