import React, { Component } from "react";
import { Form, Input, Select, Button, message } from "antd";

import { getEnumValues } from "../auth/auth-service";
import { uploadImage } from "../auth/auth-service";

import BackGround from "../BackGround";
import Loading from "../Loading";

import { RiArrowRightSLine } from "react-icons/ri";

import isnull from "lodash.isnull";

const { TextArea } = Input;

const Mailto = ({ email, subject = "", body = "", children }) => {
  let params = subject || body ? "?" : "";
  if (subject) params += `subject=${encodeURIComponent(subject)}`;
  if (body) params += `${subject ? "&" : ""}body=${encodeURIComponent(body)}`;

  return <a href={`mailto:${email}${params}`}>{children}</a>;
};

let arrValue = [];

export default class SuggestRessource extends Component {
  state = {
    title: "",
    description: "",
    link: "",
    technology: "",
    type: "",
    level: "",
    language: "",
    price: "",
    image: "",
    enumValues: [],
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    //console.log("event target", { [name]: value });
    this.setState({ [name]: value });
  };

  handleSelect = (value, LabeledValue) => {
    let name = LabeledValue.name;
    // console.log({ name, value });
    // console.log("selected value", LabeledValue)
    this.setState({ [name]: value });
  };

  handleMultipleSelect = (value, LabeledValue) => {
    let name = LabeledValue.name;
    arrValue.push(value);
    let newValue = Object.values(arrValue);
    //console.log("each value", Object.values(arrValue));
    this.setState({ [name]: newValue });
  };

  findEnumValues = () => {
    getEnumValues()
      .then((response) => {
        //console.log("response", response);
        this.setState({ enumValues: response });
      })
      .catch((error) => console.log(error));
  };

  fileChangedHandler = (event) => {
    //console.log("event.target", event.target.files[0]);

    //this.setState({ avatar: event.target.files[0] });
    const uploadData = new FormData();
    uploadData.append("image", event.target.files[0]);
    //console.log(uploadData);

    uploadImage(uploadData)
      .then((response) => {
        //console.log("response", response);
        const image = response.secure_url;
        this.setState({ image });
        //console.log("image: ", image);
      })
      .catch((error) => console.log(error));
  };

  componentDidMount() {
    this.findEnumValues();

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

  render() {
    const enumValues = this.state.enumValues;
    return (
      <div>
        <BackGround />
        {enumValues.technology &&
        enumValues.type &&
        enumValues.level &&
        enumValues.languages &&
        enumValues.price ? (
          <div className='main form'>
            <h1>Suggest a ressource</h1>
            <Form name='suggest' scrollToFirstError>
              <Form.Item
                onChange={(e) => this.handleChange(e)}
                name='title'
                label='Title'
                rules={[
                  {
                    required: true,
                    message: "Please input your Title!",
                  },
                ]}>
                <Input name='title' />
              </Form.Item>
              <Form.Item
                name='description'
                label='Description'
                onChange={this.handleChange}
                value={this.state.description}
                rules={[
                  {
                    required: true,
                    message: "Please input your descriprion!",
                    whitespace: true,
                  },
                ]}>
                <TextArea
                  placeholder='Description'
                  value={this.state.description}
                  name='description'
                  autoSize={{ minRows: 1, maxRows: 5 }}
                  showCount
                  maxLength={250}
                />
              </Form.Item>
              <Form.Item
                name='link'
                label='URL'
                onChange={this.handleChange}
                value={this.state.link}
                rules={[
                  {
                    required: true,
                    message: "Please input your url!",
                    whitespace: true,
                  },
                ]}>
                <Input name='link' type='url' value={this.state.link} />
              </Form.Item>
              <Form.Item
                name='technology'
                label='Technology'
                value={this.state.technology}
                rules={[
                  {
                    required: true,
                    message: "Max 4 elements",
                    type: "array",
                    max: 4,
                  },
                ]}>
                <Select
                  name='technology'
                  mode='multiple'
                  allowClear
                  onSelect={this.handleMultipleSelect}>
                  {enumValues.technology.map((technology, index) => {
                    return (
                      <Select.Option
                        name='technology'
                        value={technology}
                        key={index}>
                        {technology}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                name='type'
                label='Type'
                value={this.state.type}
                rules={[
                  {
                    required: true,
                    message: "Max 3 elements",
                    type: "array",
                    max: 3,
                  },
                ]}>
                <Select
                  mode='multiple'
                  allowClear
                  onSelect={this.handleMultipleSelect}>
                  {enumValues.type.map((type, index) => {
                    return (
                      <Select.Option name='type' value={type} key={index}>
                        {type}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                name='level'
                label='Level'
                value={this.state.level}
                rules={[
                  {
                    required: true,
                    message: "Please choose a level",
                  },
                ]}>
                <Select onSelect={this.handleSelect}>
                  {enumValues.level.map((level, index) => {
                    return (
                      <Select.Option name='level' value={level} key={index}>
                        {level}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                name='language'
                label='Language'
                value={this.state.language}
                rules={[
                  {
                    required: true,
                    message: "Please choose a language",
                  },
                ]}>
                <Select onSelect={this.handleSelect}>
                  {enumValues.languages.map((language, index) => {
                    return (
                      <Select.Option
                        name='language'
                        value={language}
                        key={index}>
                        {language}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                name='price'
                label='Price'
                value={this.state.price}
                rules={[
                  {
                    required: true,
                    message: "Please choose a price",
                  },
                ]}>
                <Select onSelect={this.handleSelect}>
                  {enumValues.price.map((price, index) => {
                    return (
                      <Select.Option name='price' value={price} key={index}>
                        {price}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
              {/* 
              // TODO UPLOAD Image : https://ant.design/components/upload/
              <Form.Item name='image' label='Image'>
                <input
                  type='file'
                  value={this.state.image}
                  onChange={this.fileChangedHandler}
                />
              </Form.Item> */}
              <Form.Item>
                <Mailto
                  email='contact@test.com'
                  subject={`Suggest a new ressource called ${this.state.title}`}
                  body={`Title : ${this.state.description} Description : ${this.state.description} URL : ${this.state.link} Technology : ${this.state.technology} Type : ${this.state.type} Level : ${this.state.level} Language : ${this.state.language} Price : ${this.state.price}`}>
                  Want to help us ? <RiArrowRightSLine />
                </Mailto>
              </Form.Item>
            </Form>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}
