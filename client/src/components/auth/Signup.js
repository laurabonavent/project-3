import React from "react";
import { signup } from "./auth-service";

import { Form, Input, Select, Button } from "antd";
import { upload, saveAvatar } from "./auth-service";
import { message } from "antd";
import BackButton from "../nav/BackButton";
// import { UserOutlined, LockOutlined } from "@ant-design/icons";

import BackGround from "../BackGround";

import { RiArrowRightSLine } from "react-icons/ri";

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
    //this.setState({ avatar: event.target.files[0] });
    const uploadData = new FormData();
    uploadData.append("avatar", event.target.files[0]);

    upload(uploadData)
      .then((response) => {
        const avatar = response.secure_url;
        this.setState({ avatar });
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
        message.info("Welcome friend!");
      })
      .catch((error) => {
        message.info("Something went wrong, try again");
      });
  };

  render() {
    return (
      <div className="main form create background-full">
        <BackGround />
        <BackButton />
        <h1>Signup</h1>
        <h2>to access the next level 🤓</h2>
        <Form name="signup" onFinish={this.onFinish} scrollToFirstError>
          <Form.Item
            name="email"
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
              placeholder="Email"
              // prefix={<UserOutlined className='site-form-item-icon' />}
            />
          </Form.Item>
          <Form.Item
            name="password"
            //label="Password"
            value={this.state.password}
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}>
            <Input.Password
              placeholder="Password - 8 characters please"
              // prefix={<LockOutlined className='site-form-item-icon' />}
            />
          </Form.Item>
          <Form.Item
            name="username"
            //label="Name"
            value={this.state.username}
            rules={[
              {
                required: true,
                message: "Please input your name!",
                whitespace: true,
              },
            ]}>
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="level"
            //label="Level"

            value={this.state.level}
            rules={[
              {
                required: true,
                message: "Please input your level!",
                whitespace: true,
              },
            ]}>
            <Select placeholder="Level" className="select-test">
              <Select.Option value="padawan">Padawan 🍼</Select.Option>
              <Select.Option value="jedi">Jedi 🤓</Select.Option>
              <Select.Option value="master jedi">Master Jedi 🧙‍♂️</Select.Option>
            </Select>
          </Form.Item>
          <div className="avatar-block">
            <Form.Item name="avatar" label="Your magnificent avatar 📸">
              <input
                type="file"
                onChange={this.fileChangedHandler}
                placeholder="Avatar"
              />
            </Form.Item>
          </div>
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
      </div>
    );
  }
}

export default Signup;
