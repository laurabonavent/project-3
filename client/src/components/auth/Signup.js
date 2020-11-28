import React from "react";
import { signup } from "./auth-service";
import "antd/dist/antd.css";
import { Form, Input, Select, Button } from "antd";
import { upload, saveAvatar } from "./auth-service";

const { Option } = Select;

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
    console.log("event.target", event.target.files[0]);
    
    //this.setState({ avatar: event.target.files[0] });
    const uploadData = new FormData();
    uploadData.append("avatar", event.target.files[0]);

    upload(uploadData)
      .then((response) => {
        console.log("response", response);
        const avatar = response.secure_url;
        this.setState({ avatar});
        console.log('avatar: ', avatar);

      })
      .catch((error) => console.log(error));
  };

  onFinish = (event) => {
    //event.preventDefault();
    const { email, password, username, level, role } = event;
    const avatar = this.state.avatar;
    

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
        this.props.history.push("/profile");
      })
      .catch((error) => console.log(error));

  };

  // uploadHandler = () => {
  //   console.log(this.state.avatar);
  // };

  render() {
    return (
      <>
        <Form name="signup" onFinish={this.onFinish} scrollToFirstError>
          <Form.Item
            name="email"
            label="E-mail"
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
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            value={this.state.password}
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback>
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="username"
            label="Name"
            value={this.state.username}
            rules={[
              {
                required: true,
                message: "Please input your name!",
                whitespace: true,
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="level"
            label="Level"
            value={this.state.level}
            rules={[
              {
                required: true,
                message: "Please input your level!",
                whitespace: true,
              },
            ]}>
            <Select>
              <Select.Option value="all">All</Select.Option>
              <Select.Option value="padawan">Padawan</Select.Option>
              <Select.Option value="jedi">Jedi</Select.Option>
              <Select.Option value="master jedi">Master Jedi</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="avatar" label="Avatar">
            <input type="file" onChange={this.fileChangedHandler} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  }
}

export default Signup;
