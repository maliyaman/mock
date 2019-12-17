import React, { Component } from "react";
import Navi from "./Navi";
import ProductList from "./ProductList";
import CategoryList from "./CategoryList";
import { Container, Row, Col } from "reactstrap";
import alertify from "alertifyjs";
import { Switch, Route } from "react-router-dom";
import NotFound from "./NotFound";
import CartList from "./CartList";
import FormDemo1 from "./FormDemo1";
import {connect} from 'react-redux'

 class App extends Component {
  constructor() {
    super();
    this.state = {
      currentCategory: {},
      products: [],
      charts: []
    };
  }
  componentDidMount = () => {
    this.getProducts();
  };
  changeCategory = category => {
    if (this.state.currentCategory !== category) {
      this.setState({ currentCategory: category });
    }
    this.getProducts(category.id);
  };
  removeFromCart = product => {
    let newCharts = this.state.charts.filter(
      c => c.product.id !== product.product.id
    );
    this.setState({ charts: newCharts });
    alertify.error(product.product.productName + " Silindi");
  };

  getProducts = categoryId => {
    let url = "http://localhost:3000/products";
    if (this.props.currentCategory.id) {
      url = url + "?categoryId=" + this.props.currentCategory.id;
    }
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ products: data }));
  };
  addCharts = product => {
    let tempCharts = this.state.charts;
    let index = tempCharts.findIndex(
      productTemp => productTemp.product.id === product.id
    );
    if (index > -1) {
      tempCharts[index].quantity++;
    } else {
      tempCharts.push({ product, quantity: 1 });
    }
    this.setState({ charts: tempCharts });
    alertify.success(product.productName + " Eklendi");
  };

  render() {
    let productInfo = { title: "Product List" };
    let categoryInfo = { title: "Category List" };
    return (
      <div className="App">
           <h6>{this.props.currentCategory.categoryName}</h6>
        <Container>
          <Navi
            removeFromCart={this.removeFromCart}
            charts={this.state.charts}
          />
          <hr />
          <Row>
            <Col xs="3">
              <CategoryList
                changeCategory={this.changeCategory}
                info={categoryInfo}
                currentCategory={this.state.currentCategory}
              ></CategoryList>
            </Col>
            <Col xs="9">
              <Switch>
                <Route
                  exact
                  path="/"
                  render={props => (
                    <ProductList
                      {...props}
                      info={productInfo}
                      getProducts={this.getProducts}
                      products={this.state.products}
                      currentCategory={this.state.currentCategory}
                      addCharts={this.addCharts}
                    ></ProductList>
                  )}
                ></Route>
                <Route
                  exact
                  path="/cartlist"
                  render={props => (
                    <CartList
                      {...props}
                      charts={this.state.charts}
                      removeFromCart={this.removeFromCart}
                    ></CartList>
                  )}
                ></Route>
                <Route exact path="/form" component={FormDemo1}></Route>
                <Route component={NotFound}></Route>
              </Switch>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    currentCategory: state.changeCategoryReducer
  };
}


export default  connect(mapStateToProps)(App)