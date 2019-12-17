import React, { Component } from "react";
import { Table, Badge } from "reactstrap";

export default class CartList extends Component {
  renderCart() {
    return (
      <Table stripped="true">
        <thead>
          <tr>
            <th>#</th>
            <th>Category Id</th>
            <th>Product Name</th>
            <th>Unit Price</th>
            <th>Units In Stock</th>
            <th>Quantity</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.props.charts.map(c => (
            <tr key={c.product.id}>
              <td>{c.product.id}</td>
              <td>{c.product.categoryId}</td>
              <td>{c.product.productName}</td>
              <td>{c.product.unitPrice}</td>
              <td>{c.product.unitsInStock}</td>
              <td>{c.product.quantityPerUnit}</td>
              <td>
                <Badge
                  color="danger"
                  onClick={() => this.props.removeFromCart(c)}
                >
                  X
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
  render() {
    return <div>{this.renderCart()}</div>;
  }
}
