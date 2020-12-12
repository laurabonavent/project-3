import React, { Component } from "react";
//import ReactDOM from "react-dom";
import { Form, Input, Button, Checkbox } from "antd";
import { login } from "./auth-service";
import { Link } from "react-router-dom";
import { message } from "antd";

import BackButton from "../nav/BackButton";

import { RiArrowRightSLine } from "react-icons/ri";
import DarkRed from "../../images/dark-red.svg";
import Yellow from "../../images/yellow.svg";
import OrangeRed from "../../images/orange-red.svg";

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
        message.info("Yeaah you're in");
      })
      .catch((error, response) => {
        message.info("Wrong credentials, try again !");
        console.log(error);
      });
  };

  render() {
    return (
      <div className='main login'>
        <img className='dark-red' src={DarkRed} alt='' />
        <img className='yellow' src={Yellow} alt='' />
        <img className='orange-red' src={OrangeRed} alt='' />
        <BackButton />
        <h1>
          {`<h1> Welcome
          Back 👋 </h1>`}
        </h1>
        <Form
          initialValues={{
            remember: true,
          }}
          onFinish={this.onFinish}>
          <Form.Item
            name='email'
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}>
            <Input placeholder='Email' />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
            hasFeedback>
            <Input.Password placeholder='Password' />
          </Form.Item>
          <Form.Item>
            {/* <Form.Item name='remember' valuePropName='checked' noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item> */}
            {/* <Link className='login-form-forgot' to=''>
              Forgot password
            </Link> */}
          </Form.Item>
          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'>
              <RiArrowRightSLine />
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
