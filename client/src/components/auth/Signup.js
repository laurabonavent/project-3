import React from "react";
import { signup } from "./auth-service";
import { Form, Input, Select, Button } from "antd";
import { upload, saveAvatar } from "./auth-service";
import { message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
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
        this.setState({ avatar });
        console.log("avatar: ", avatar);
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
      <>
        <Form name='signup' onFinish={this.onFinish} scrollToFirstError>
          <Form.Item
<<<<<<< HEAD
            name="email"
            //label="E-mail"

=======
            name='email'
            label='E-mail'
>>>>>>> 45d92058b9c2ad2b3c1f6734383922f9041921e5
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
              prefix={<UserOutlined className="site-form-item-icon" />}
            />
          </Form.Item>
          <Form.Item
<<<<<<< HEAD
            name="password"
            //label="Password"
=======
            name='password'
            label='Password'
>>>>>>> 45d92058b9c2ad2b3c1f6734383922f9041921e5
            value={this.state.password}
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback>
            <Input.Password
              placeholder="Password"
              prefix={<LockOutlined className="site-form-item-icon" />}
            />
          </Form.Item>
          <Form.Item
<<<<<<< HEAD
            name="username"
            //label="Name"
=======
            name='username'
            label='Name'
>>>>>>> 45d92058b9c2ad2b3c1f6734383922f9041921e5
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
<<<<<<< HEAD
            name="level"
            //label="Level"

=======
            name='level'
            label='Level'
>>>>>>> 45d92058b9c2ad2b3c1f6734383922f9041921e5
            value={this.state.level}
            rules={[
              {
                required: true,
                message: "Please input your level!",
                whitespace: true,
              },
            ]}>
<<<<<<< HEAD
            <Select placeholder="Level">
              <Select.Option value="padawan">Padawan</Select.Option>
              <Select.Option value="jedi">Jedi</Select.Option>
              <Select.Option value="master jedi">Master Jedi</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="avatar" label="Avatar">
            <input
              type="file"
              onChange={this.fileChangedHandler}
              placeholder="Avatar"
            />
=======
            <Select>
              <Select.Option value='padawan'>Padawan</Select.Option>
              <Select.Option value='jedi'>Jedi</Select.Option>
              <Select.Option value='master jedi'>Master Jedi</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name='avatar' label='Avatar'>
            <input type='file' onChange={this.fileChangedHandler} />
>>>>>>> 45d92058b9c2ad2b3c1f6734383922f9041921e5
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Register
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  }
}

export default Signup;
