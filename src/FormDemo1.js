import React, { Component } from "react";
import alertify from "alertifyjs";
import { Button, FormGroup, Label, Input } from "reactstrap";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
// import CKEditor from "@ckeditor/ckeditor5-react";
// import {CKEditor}  from "../node_modules/ckeditor-custom-mode";

export default class FormDemo1 extends Component {
  state = {
    email: "",
    password: "",
    city: "",
    description: "",
    date: new Date(),
    richText: ""
  };

  onChangeHandler = event => {
    let name = event.target.name;
    let value = event.target.value;

    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    alertify.success(this.state.email + " added to db");
  };

  render() {
    return (
      <div>
        <FormGroup onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Enter email"
              onChange={this.onChangeHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="text"
              name="password"
              id="password"
              placeholder="Enter password"
              onChange={this.onChangeHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="textarea"
              name="description"
              id="description"
              placeholder="Enter description"
              onChange={this.onChangeHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="date">Date</Label>
            <DateTimePicker
              format="MM/DD/YY"
              defaultValue={new Date()}
              time={false}
              onChange={value => this.setState({ date: value })}
            />
          </FormGroup>

          <FormGroup>
            <Label for="city">City</Label>
            <Input
              type="select"
              name="city"
              id="city"
              onChange={this.onChangeHandler}
            >
              <option>Ankara</option>
              <option>Adana</option>
              <option>Istanbul</option>
              <option>Hatay</option>
              <option>Trabzon</option>
            </Input>
          </FormGroup>
          <FormGroup>
            {/* <CKEditor
              data={this.state.richText}
              editor={HarmonyEditor}
              onInit={editor => {
                // You can store the "editor" and use when it is needed.
                console.log("Editor is ready to use!", editor);
              }}
              onChange={(event, editor) => {
                const data = event.editor.getData();
                this.setState({ richText: data });
                console.log({ event, editor, data });
              }}
              onBlur={(event, editor) => {
                console.log("Blur.", editor);
              }}
              onFocus={(event, editor) => {
                console.log("Focus.", editor);
              }}
            /> */}
          </FormGroup>
          <Button type="submit">Save</Button>
        </FormGroup>
      </div>
    );
  }
}
