import React from "react";
import { editSignup } from "../auth/auth-service";
import { Form, Input, Select, Button } from "antd";
import { upload, saveAvatar } from "../auth/auth-service";
import isnull from "lodash.isnull";
import { message } from "antd";

import { RiArrowRightSLine } from "react-icons/ri";
import BackGround from "../BackGround";
import Loading from "../Loading";

export default class EditProfile extends React.Component {
  state = {
    // email: "",
    // password: "",
    // username: "",
    // level: "",
    avatar: "",
  };

  formRef = React.createRef();

  onFinish = (event) => {
    //event.preventDefault();
    let password = event.password;
    if (event.password === "") {
      password = this.props.userInSession.password;
    } else {
      password = event.password;
    }

    let avatar;
    if (!event.avatar) {
      avatar = this.props.userInSession.avatar;
    } else {
      avatar = this.state.avatar;
    }

    const { email, username, level } = event;

    editSignup(email, username, password, level, avatar)
      .then((response) => {
        this.props.history.push("/profile");
        this.props.updateUser(response);
      })
      .catch((error) => console.log(error));
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

  componentDidMount() {
    //   if (isnull(this.props.userInSession)) return "..loading";

    //   if (this.props.userInSession === false) {
    //     message.info("You need to log in before access this page");
    //     this.props.history.push("/");
    //     //return <Redirect to="/" />;
    //     return;
    //   }

    if (this.props.userInSession) {
      const { email, username, level } = this.props.userInSession;

      this.formRef.current.setFieldsValue({
        email,
        username,
        password: "",
        level,
      });
    }
  }

  render() {
    //if (isnull(this.state.loggedInUser)) return "..loading";

    return (
      <div className="main form background-full">
        <h1>Edit profile page</h1>
        <Form
          name="signup-edit"
          onFinish={this.onFinish}
          scrollToFirstError
          ref={this.formRef}>
          {this.props.userInSession ? (
            <>
              <Form.Item
                name="email"
                label="E-mail"
                // value={this.state.email}
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
                // value={this.state.password}
                // rules={[
                //   {
                //     required: true,
                //     message: "Please input your password!",
                //   },
                // ]}
                hasFeedback>
                <Input.Password placeholder="Don't touch if you want to keep the same password" />
              </Form.Item>
              <Form.Item
                name="username"
                label="Name"
                // value={this.state.username}
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
                // value={this.state.level}
                rules={[
                  {
                    required: true,
                    message: "Please input your level!",
                    whitespace: true,
                  },
                ]}>
                <Select>
                  <Select.Option value="padawan">Padawan</Select.Option>
                  <Select.Option value="jedi">Jedi</Select.Option>
                  <Select.Option value="master jedi">Master Jedi</Select.Option>
                </Select>
              </Form.Item>
              <div className="avatar-block">
                <p className="label">Your magnificent avatar 📸</p>
                <img
                  className="preview"
                  src={this.props.userInSession.avatar}
                  alt="avatar"
                />
                <Form.Item name="avatar" label="Want to change it ?">
                  <input
                    value={this.props.userInSession.image}
                    type="file"
                    onChange={this.fileChangedHandler}
                  />
                </Form.Item>
              </div>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="main-form-button">
                  <RiArrowRightSLine />
                </Button>
              </Form.Item>
            </>
          ) : (
            <Loading />
          )}
        </Form>
      </div>
    );
  }
}
