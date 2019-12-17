import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as categoryActions from "../src/redux/actions/categoryActions";
import * as productActions from "../src/redux/actions/productActions";

class CategoryList extends Component {
  constructor() {
    super();
    this.state = {
      counter: 1,
      categories: [],
      currentCategory: {}
    };
  }

  componentWillMount = () => {
    this.props.actions.getCategories();
  };
  getCategories = () => {
    fetch("http://localhost:3000/categories")
      .then(response => response.json())
      .then(data => this.setState({ categories: data }));
    console.log(this.state.categories);
  };

  categoryChange = category => {
    this.props.actions.changeCategory(category);
    this.props.actions.getProducts(category.id);
  };

  render() {
    return (
      <div>
        <h5>{this.props.info.title}</h5>
        <ListGroup>
          {this.props.categories.map(category => (
            <ListGroupItem
              active={category.id === this.props.currentCategory.id}
              key={category.id}
              onClick={() => this.categoryChange(category)}
            >
              {category.categoryName}
            </ListGroupItem>
          ))}
        </ListGroup>
        <h3>{this.props.currentCategory.categoryName}</h3>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentCategory: state.changeCategoryReducer,
    categories: state.categoryListReducer
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
      getProducts: bindActionCreators(productActions.getProducts, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
