import React, { Component } from "react";
//import "antd/dist/";
import { Form, Input, Select, Button, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { getEnumValues } from "../auth/auth-service";
import { uploadImage } from "../auth/auth-service";
import { createRessource } from "../auth/auth-service";

const { TextArea } = Input;
const { Option } = Select;

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

export default class CreateRessource extends Component {
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

  // onChangeUpload = (info) => {
  //   if (info.file.status !== "uploading") {
  //     console.log(info.file, info.fileList);
  //   }
  //   if (info.file.status === "done") {
  //     message.success(`${info.file.name} file uploaded successfully`);
  //   } else if (info.file.status === "error") {
  //     message.error(`${info.file.name} file upload failed.`);
  //   }
  // };

  fileChangedHandler = (event, info, fileList, file) => {
    // console.log("fileList", fileList);
    // console.log("event", event);
    // console.log("info", info);
    // console.log("file", file);

    // if (event.file.status !== "uploading") {
    //   console.log(event.file, event.fileList);
    // }

    // if (event.file.status === "done") {
    //   message.success(`${event.file.name} file uploaded successfully`);
    // } else if (event.file.status === "error") {
    //   message.error(`${event.file.name} file upload failed.`);
    // }

    // // // TEST
    // this.setState({ image: event.file });
    // const uploadData = new FormData();
    // uploadData.append("image", event.file);

    // CODE OK
    console.log("event.target", event.target.files[0]);
    this.setState({ image: event.target.files[0] });
    const uploadData = new FormData();
    uploadData.append("image", event.target.files[0]);
    const hide = message.loading("Action in progress..", 0);
    // Dismiss manually and asynchronously
    setTimeout(hide, 300);

    uploadImage(uploadData)
      .then((response) => {
        const image = response.secure_url;
        this.setState({ image });
        console.log("image: ", image);
        message.success("Image uploaded");
      })
      .catch((error) => console.log(error));
  };

  onFinish = (event) => {
    console.log(event);
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

    createRessource(
      title,
      description,
      image,
      link,
      language,
      technology,
      type,
      level,
      price
    )
      .then((response) => {
        console.log("createResponse", response);
        this.props.history.push(`/ressources/${response._id}`);
      })
      .catch((error) => console.log(error));
  };

  componentDidMount() {
    this.findEnumValues();
  }

  render() {
    const enumValues = this.state.enumValues;
    return (
      <div>
        {enumValues.technology &&
        enumValues.type &&
        enumValues.level &&
        enumValues.languages &&
        enumValues.price ? (
          <div>
            Create a new ressource
            <Form name='create' onFinish={this.onFinish} scrollToFirstError>
              <Form.Item
                onChange={this.onChange}
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
                  // addonBefore={selectBefore}
                  // addonAfter={selectAfter}
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
              {/* TODO UPLOAD Image : https://ant.design/components/upload/ */}
              <Form.Item
                name='image'
                label='Image'
                rules={[
                  {
                    required: true,
                    message: "Please upload an image",
                  },
                ]}>
                <input
                  type='file'
                  value={this.state.image}
                  onChange={this.fileChangedHandler}
                />
              </Form.Item>
              {/* TEST UPLOAD ANTD */}
              {/*
              <Upload
                fileList={this.state.fileList}
                onChange={this.fileChangedHandler}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload> */}
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
