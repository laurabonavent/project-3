import React, { Component } from "react";
import "antd/dist/antd.css";
import { Form, Input, Select, Button } from "antd";

import { getEnumValues } from "../auth/auth-service";
import { editRessource } from "../auth/auth-service";
import { getOneRessource } from "../auth/auth-service";

const { TextArea } = Input;
const { Option } = Select;

const selectBefore = (
  <Select initialvalues='http://' className='select-before'>
    <Option value='https://'>https://</Option>
    <Option value='http://'>http://</Option>
  </Select>
);
const selectAfter = (
  <Select initialvalues='.com' className='select-after'>
    <Option value='.com'>.com</Option>
    <Option value='.jp'>.fr</Option>
    <Option value='.org'>.org</Option>
  </Select>
);

export default class EditRessource extends Component {
  state = {
    // title: "",
    // description: "",
    // link: "",
    // technology: "",
    // type: "",
    // level: "",
    // language: "",
    // price: "",
    // image: "",
    enumValues: [],
    ressource: {},
  };

  onChange = ({ target: { value } }) => {
    this.setState({ description: value });
  };

  findEnumValues = () => {
    getEnumValues()
      .then((response) => {
        //console.log("response", response);
        this.setState({ enumValues: response });
      })
      .catch((error) => console.log(error));
  };

  findRessource = (id) => {
    getOneRessource(id)
      .then((response) => {
        console.log("response", response);
        this.setState({ ressource: response });
      })
      .catch((error) => console.log(error));
  };

  onFinish = (event) => {
    console.log(event);
    const {
      title,
      description,
      //image,
      link,
      language,
      technology,
      type,
      level,
      price,
    } = event;

    editRessource(
      title,
      description,
      //image,
      link,
      language,
      technology,
      type,
      level,
      price
    )
      .then((response) => {
        this.setState({
          title: response.title,
          description: response.description,
          link: response.link,
          level: response.level,
          language: response.language,
          type: response.type,
          price: response.price,
        });
      })
      .catch((error) => console.log(error));
  };

  componentDidMount() {
    this.findEnumValues();
    const {
      match: { params },
    } = this.props;
    this.findRessource(params.id);
  }

  render() {
    const enumValues = this.state.enumValues;
    const ressource = this.state.ressource;
    return (
      <div>
        {enumValues.technologies &&
        enumValues.types &&
        enumValues.level &&
        enumValues.languages &&
        enumValues.price &&
        ressource ? (
          <div>
            Edit ressource
            <Form name='create' onFinish={this.onFinish} scrollToFirstError>
              <Form.Item
                onChange={this.onChange}
                name='title'
                label='Title'
                rules={[
                  {
                    required: true,
                    message: "Please input your Title!",
                  },
                ]}>
                <Input />
              </Form.Item>
              <Form.Item
                name='description'
                label='Description'
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
                  onChange={this.onChange}
                  autoSize={{ minRows: 1, maxRows: 5 }}
                  showCount
                  maxLength={250}
                />
              </Form.Item>
              <Form.Item
                name='link'
                label='URL'
                value={this.state.link}
                rules={[
                  {
                    required: true,
                    message: "Please input your url!",
                    whitespace: true,
                  },
                ]}>
                <Input
                  addonBefore={selectBefore}
                  addonAfter={selectAfter}
                  value={this.state.link}
                />
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
                <Select mode='multiple' allowClear>
                  {enumValues.technologies.map((technology, index) => {
                    return (
                      <Select.Option value={technology} key={index}>
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
                <Select mode='multiple' allowClear>
                  {enumValues.types.map((type, index) => {
                    return (
                      <Select.Option value={type} key={index}>
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
                <Select>
                  {enumValues.level.map((level, index) => {
                    return (
                      <Select.Option value={level} key={index}>
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
                <Select>
                  {enumValues.languages.map((language, index) => {
                    return (
                      <Select.Option value={language} key={index}>
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
                <Select>
                  {enumValues.price.map((price, index) => {
                    return (
                      <Select.Option value={price} key={index}>
                        {price}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
              {/* <Form.Item name='image' label='Image'>
                <input
                  type='file'
                  value={this.state.image}
                  onChange={this.fileChangedHandler}
                />
              </Form.Item> */}
              <Form.Item>
                <Button type='primary' htmlType='submit'>
                  Register
                </Button>
              </Form.Item>
            </Form>
          </div>
        ) : (
          "Loading.."
        )}
      </div>
    );
  }
}
