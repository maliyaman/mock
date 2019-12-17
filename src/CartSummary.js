import React, { Component } from "react";
import {
  Badge,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { Link } from "react-router-dom";

export default class CartSummary extends Component {
  renderCart = () => {
    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          Your Chart - {this.props.charts.length}
        </DropdownToggle>
        <DropdownMenu right>
          {this.props.charts.map(product => (
            <DropdownItem key={product.product.id.toString()}>
              <Badge
                key={product.id}
                color="danger"
                onClick={() => this.props.removeFromCart(product)}
              >
                X
              </Badge>
              &nbsp; &nbsp; &nbsp;
              {product.product.productName} - {product.quantity}
            </DropdownItem>
          ))}
            <DropdownItem><Link to="/cartlist">Go To Chart</Link></DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  };

  renderEmptyCart = () => {
    return (
      <NavItem>
        <NavLink>Empty Cart</NavLink>
      </NavItem>
    );
  };
  render() {
    return (
      <div>
        {this.props.charts.length === 0
          ? this.renderEmptyCart()
          : this.renderCart()}

      
      </div>
    );
  }
}
