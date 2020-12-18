import React, { Component } from "react";
//import "antd/dist/antd.css";
import { Form, Input, Select, Button, message } from "antd";

import { getEnumValues } from "../auth/auth-service";
import { editRessource } from "../auth/auth-service";
import { getOneRessource } from "../auth/auth-service";
import { uploadImage } from "../auth/auth-service";

import BackGround from "../BackGround";
import Loading from "../Loading";

import { RiArrowRightSLine } from "react-icons/ri";

import isnull from "lodash.isnull";

const { TextArea } = Input;
//const { Option } = Select;

// const selectBefore = (
//   <Select initialvalues='http://' className='select-before'>
//     <Option value='https://'>https://</Option>
//     <Option value='http://'>http://</Option>
//   </Select>
// );
// const selectAfter = (
//   <Select initialvalues='.com' className='select-after'>
//     <Option value='.com'>.com</Option>
//     <Option value='.jp'>.fr</Option>
//     <Option value='.org'>.org</Option>
//   </Select>
// );

export default class EditRessource extends Component {
  state = {
    enumValues: [],
    ressource: {},
  };

  formRef = React.createRef();

  // onChange = (e) => {
  //   console.log("event", e);
  // };

  findEnumValues = () => {
    getEnumValues()
      .then((response) => {
        this.setState({ enumValues: response });
      })
      .catch((error) => console.log(error));
  };

  findRessource = (id) => {
    getOneRessource(id)
      .then((response) => {
        //console.log("response", response);
        this.setState({ ressource: response });
      })
      .catch((error) => console.log(error));
  };

  fileChangedHandler = (event) => {
    //console.log("event.target", event.target.files[0]);

    //this.setState({ avatar: event.target.files[0] });
    const uploadData = new FormData();
    uploadData.append("image", event.target.files[0]);
    const hide = message.loading("Action in progress..", 0);
    // Dismiss manually and asynchronously
    setTimeout(hide, 300);

    uploadImage(uploadData)
      .then((response) => {
        const image = response.secure_url;
        this.setState({ image });
        //console.log("image: ", image);
        message.success("Image uploaded");
      })
      .catch((error) => console.log(error));
  };

  onFinish = (event, id) => {
    const {
      title,
      description,
      link,
      language,
      technology,
      type,
      level,
      price,
    } = event;

    const image = this.state.image;

    editRessource(
      title,
      description,
      image,
      link,
      language,
      technology,
      type,
      level,
      price,
      this.state.ressource._id
    )
      .then((response) => {
        //console.log("response edit", response);
        this.setState({
          ressource: response,
          formStatus: "ok",
        });
        message.success("Ressource updated");
      })
      .catch((error) => {
        message.error("Ressource not updated");
        console.log(error);
      });
  };

  componentDidMount() {
    this.findEnumValues();
    const {
      match: { params },
    } = this.props;
    this.findRessource(params.id);

    if (isnull(this.props.userInSession)) {
      message.error("You need to log in before access this page");
      this.props.history.push("/");
      //return <Redirect to="/" />;
      return;
    }

    if (this.props.userInSession === false) {
      message.error("You need to log in before access this page");
      this.props.history.push("/");
      //return <Redirect to="/" />;
      return;
    }
    if (isnull(this.props.userInSession)) {
      message.error("You need to log in before access this page");
      this.props.history.push("/");
      //return <Redirect to="/" />;
      return;
    }

    if (this.props.userInSession === false) {
      message.error("You need to log in before access this page");
      this.props.history.push("/");
      //return <Redirect to="/" />;
      return;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.enumValues.technology &&
      this.state.enumValues.type &&
      this.state.enumValues.level &&
      this.state.enumValues.languages &&
      this.state.enumValues.price &&
      this.state.ressource
    ) {
      const {
        title,
        description,
        link,
        technology,
        type,
        level,
        language,
        price,
      } = this.state.ressource;
      this.formRef.current.setFieldsValue({
        title,
        description,
        link,
        technology,
        type,
        level,
        language,
        price,
      });
    }
  }

  render() {
    //console.log("ref:", React.createRef());
    const enumValues = this.state.enumValues;
    const ressource = this.state.ressource;
    return (
      <div className="main form background-full">
        <h1>Edit ressource</h1>
        <Form
          name="create"
          onFinish={this.onFinish}
          scrollToFirstError
          ref={this.formRef}>
          {enumValues.technology &&
          enumValues.type &&
          enumValues.level &&
          enumValues.languages &&
          enumValues.price &&
          ressource ? (
            <div>
              <Form.Item
                name="title"
                label="Title"
                rules={[
                  {
                    required: true,
                    message: "Please input your Title!",
                  },
                ]}>
                <Input />
              </Form.Item>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: "Please input your descriprion!",
                    whitespace: true,
                  },
                ]}>
                <TextArea
                  placeholder="Description"
                  //onChange={this.onChange}
                  autoSize={{ minRows: 1, maxRows: 5 }}
                  showCount
                  maxLength={250}
                />
              </Form.Item>
              <Form.Item
                name="link"
                label="URL"
                rules={[
                  {
                    required: true,
                    message: "Please input your url!",
                    whitespace: true,
                  },
                ]}>
                <Input />
              </Form.Item>
              <Form.Item
                name="technology"
                label="Technology"
                rules={[
                  {
                    required: true,
                    message: "Max 4 elements",
                    type: "array",
                    max: 4,
                  },
                ]}>
                <Select mode="multiple" allowClear>
                  {enumValues.technology.map((technology, index) => {
                    return (
                      <Select.Option value={technology} key={index}>
                        {technology}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                name="type"
                label="Type"
                rules={[
                  {
                    required: true,
                    message: "Max 3 elements",
                    type: "array",
                    max: 3,
                  },
                ]}>
                <Select mode="multiple" allowClear>
                  {enumValues.type.map((type, index) => {
                    return (
                      <Select.Option value={type} key={index}>
                        {type}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                name="level"
                label="Level"
                rules={[
                  {
                    required: true,
                    message: "Please choose a level",
                  },
                ]}>
                <Select>
                  {enumValues.level.map((level, index) => {
                    return <Select.Option key={index}>{level}</Select.Option>;
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                name="language"
                label="Language"
                rules={[
                  {
                    required: true,
                    message: "Please choose a language",
                  },
                ]}>
                <Select>
                  {enumValues.languages.map((language, index) => {
                    return (
                      <Select.Option key={index}>{language}</Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                name="price"
                label="Price"
                rules={[
                  {
                    required: true,
                    message: "Please choose a price",
                  },
                ]}>
                <Select>
                  {enumValues.price.map((price, index) => {
                    return <Select.Option key={index}>{price}</Select.Option>;
                  })}
                </Select>
              </Form.Item>
              <div className="avatar-block">
                <img
                  className="preview"
                  src={this.state.ressource.image}
                  alt={this.state.ressource.title}
                />
                <Form.Item
                  name="image"
                  label="Image"
                  rules={[
                    {
                      required: true,
                      message: "Please upload an image",
                    },
                  ]}>
                  <input
                    type="file"
                    value={this.state.ressource.image}
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
            </div>
          ) : (
            <Loading />
          )}
        </Form>
      </div>
    );
  }
}
