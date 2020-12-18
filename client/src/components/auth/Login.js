import React, { Component } from "react";
//import ReactDOM from "react-dom";
import { Form, Input, Button, Checkbox } from "antd";
import { login } from "./auth-service";
import { Link } from "react-router-dom";
import { message } from "antd";

import BackButton from "../nav/BackButton";

import { RiArrowRightSLine } from "react-icons/ri";
import BackGround from "../BackGround";

export default class Login extends Component {
  state = { email: "", password: "" };

  onFinish = (event) => {
    const email = event.email;
    const password = event.password;

    login(email, password)
      .then((response) => {
        this.setState({ email: response.email, password: response.password });
        this.props.updateUser(response);
        this.props.history.push("/profile");
        message.success("Yeaah you're in");
      })
      .catch((error, response) => {
        message.error("Wrong credentials, try again !");
      });
  };

  render() {
    return (
      <div className="main form login background-full">
        <BackButton />
        <h1>
          {`Welcome
          Back 👋 `}
        </h1>
        <Form
          initialValues={{
            remember: true,
          }}
          onFinish={this.onFinish}>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
            hasFeedback>
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="main-form-button">
              <RiArrowRightSLine
                style={{ height: "2em", width: "2em" }}
                viewBox="0 0 26 14"
              />
            </Button>
          </Form.Item>
        </Form>
        {/* <div className='bottom-links'>
          <Link to='/signup'>Signup</Link>
        </div> */}
      </div>
    );
  }
}

//ReactDOM.render(<Login />, document.getElementById("root"));
