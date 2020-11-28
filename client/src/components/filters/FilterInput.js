import "antd/dist/antd.css";
import React from "react";
import { Select } from "antd";
const { Option } = Select;


class FilterInput extends React.Component {
  handleChange = (value) => {
      console.log(`selected ${value}`);
  };

  render() {
    return (
      <>
        <Select
          mode="multiple"
          allowClear
          placeholder="Technology"
          style={{ width: "100%" }}
          onChange={this.handleChange}
          rules={[
            {
              type: "array",
              max: 15,
            },
          ]}>
          {this.props.dataFilters.map((el, index) => (
            <Option key={index} value={el}>
              {el}
            </Option>
          ))}
        </Select>
      </>
    );
  }
}

export default FilterInput;
