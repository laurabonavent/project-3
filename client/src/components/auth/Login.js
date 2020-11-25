import React, { Component } from "react";
//import ReactDOM from "react-dom";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { login } from "./auth-service";
import { Link } from "react-router-dom";

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
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div>
        <Form
          name='normal_login'
          className='login-form'
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
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder='Email'
            />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}>
            <Input
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='Password'
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name='remember' valuePropName='checked' noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Link className='login-form-forgot' to=''>
              Forgot password
            </Link>
          </Form.Item>
          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'>
              Log in
            </Button>
            Or <Link to='/signup'>register now!</Link>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

//ReactDOM.render(<Login />, document.getElementById("root"));
