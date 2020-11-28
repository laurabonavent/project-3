import React, { Component } from "react";
import "antd/dist/antd.css";
import { Form, Input, Select, Button } from "antd";
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

export default class CreateRessource extends Component {
  state = {
    title: "",
    description: "",
    url: "",
    technology: "",
    type: "",
    level: "",
    language: "",
    price: "",
    image: "",
  };

  onChange = ({ target: { value } }) => {
    this.setState({ description: value });
  };

  componentDidMount() {
    this.findEnumValues();
  }

  render() {
    return (
      <div>
        Create a new ressource
        <Form name='create' onFinish={this.onFinish} scrollToFirstError>
          <Form.Item
            name='title'
            label='Title'
            value={this.state.title}
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
            name='url'
            label='URL'
            value={this.state.url}
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
              initialvalues='mysite'
            />
          </Form.Item>
          <Form.Item
            name='technology'
            label='Technology'
            value={this.state.technology}
            rules={[
              {
                required: true,
                message: "Please input your technology!",
                whitespace: true,
              },
            ]}>
            <Select>
              <Select.Option value='all'>All</Select.Option>
              <Select.Option value='api'>API</Select.Option>
              <Select.Option value='browser'>Browser</Select.Option>
              <Select.Option value='css'>CSS</Select.Option>
              <Select.Option value='express'>Express</Select.Option>
              <Select.Option value='handlebars'>Handlebars</Select.Option>
              <Select.Option value='html'>HTML</Select.Option>
              <Select.Option value='javascript'>Javascript</Select.Option>
              <Select.Option value='mongodb'>MongoDB</Select.Option>
              <Select.Option value='nodejs'>NodeJS</Select.Option>
              <Select.Option value='reactjs'>ReactJS</Select.Option>
              <Select.Option value='vscode'>VSCode</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name='level'
            label='Level'
            value={this.state.level}
            rules={[
              {
                required: true,
                message: "Please input your level!",
                whitespace: true,
              },
            ]}>
            <Select>
              <Select.Option value='every force'>Every Force</Select.Option>
              <Select.Option value='padawan'>Padawan</Select.Option>
              <Select.Option value='jedi'>Jedi</Select.Option>
              <Select.Option value='master jedi'>Master Jedi</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name='avatar' label='Avatar'>
            <input type='file' onChange={this.fileChangedHandler} />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
