import React from "react";
import { signup } from "./auth-service";

import { Form, Input, Select, Button } from "antd";
import { upload, saveAvatar } from "./auth-service";
import { message } from "antd";
// import { UserOutlined, LockOutlined } from "@ant-design/icons";

import DarkRed from "../../images/dark-red.svg";
import Yellow from "../../images/yellow.svg";
import OrangeRed from "../../images/orange-red.svg";

import { RiArrowRightSLine } from "react-icons/ri";

import Footer from "../nav/Footer";

class Signup extends React.Component {
  state = {
    email: "",
    password: "",
    username: "",
    level: "",
    avatar: "",
    role: "user",
  };

  fileChangedHandler = (event) => {
    //console.log("event.target", event.target.files[0]);

    //this.setState({ avatar: event.target.files[0] });
    const uploadData = new FormData();
    uploadData.append("avatar", event.target.files[0]);

    upload(uploadData)
      .then((response) => {
        //console.log("response", response);
        const avatar = response.secure_url;
        this.setState({ avatar });
        //console.log("avatar: ", avatar);
      })
      .catch((error) => console.log(error));
  };

  onFinish = (event) => {
    //event.preventDefault();
    const { email, password, username, level } = event;
    const avatar = this.state.avatar;
    const role = this.state.role;

    signup(email, username, password, level, role, avatar)
      .then((response) => {
        this.setState({
          email: "",
          password: "",
          username: "",
          level: "",
          avatar: "",
          role: "user",
        });
        this.props.updateUser(response);
        this.props.history.push("/profile");
        message.info(response.message);
      })
      .catch((error) => {
        message.info(error.message);
        console.log(error);
      });
  };

  // uploadHandler = () => {
  //   console.log(this.state.avatar);
  // };

  render() {
    return (
      <div className='main signup'>
        <img className='dark-red' src={DarkRed} alt='' />
        <img className='yellow' src={Yellow} alt='' />
        <img className='orange-red' src={OrangeRed} alt='' />
        <h1>Signup</h1>
        <h2>to access the next level 🤓</h2>
        <Form name='signup' onFinish={this.onFinish} scrollToFirstError>
          <Form.Item
            name='email'
            //label="E-mail"

            value={this.state.email}
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}>
            <Input
              placeholder='Email'
              // prefix={<UserOutlined className='site-form-item-icon' />}
            />
          </Form.Item>
          <Form.Item
            name='password'
            //label="Password"
            value={this.state.password}
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback>
            <Input.Password
              placeholder='Password'
              // prefix={<LockOutlined className='site-form-item-icon' />}
            />
          </Form.Item>
          <Form.Item
            name='username'
            //label="Name"
            value={this.state.username}
            rules={[
              {
                required: true,
                message: "Please input your name!",
                whitespace: true,
              },
            ]}>
            <Input placeholder='Name' />
          </Form.Item>
          <Form.Item
            name='level'
            //label="Level"

            value={this.state.level}
            rules={[
              {
                required: true,
                message: "Please input your level!",
                whitespace: true,
              },
            ]}>
            <Select placeholder='Level' className='select-test'>
              <Select.Option value='padawan'>Padawan</Select.Option>
              <Select.Option value='jedi'>Jedi</Select.Option>
              <Select.Option value='master jedi'>Master Jedi</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name='avatar' label='Avatar'>
            <input
              type='file'
              onChange={this.fileChangedHandler}
              placeholder='Avatar'
            />
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
        <Footer userInSession={this.state.loggedInUser} />
      </div>
    );
  }
}

export default Signup;
