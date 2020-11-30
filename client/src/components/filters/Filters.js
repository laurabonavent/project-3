import React from "react";
import { getEnumValues } from "../auth/auth-service";
import { Select, TreeSelect } from "antd";
const { Option } = Select;
const { TreeNode } = TreeSelect;


class Filters extends React.Component {
  state = {
    enumValues: [],

  };

  findEnumValues = () => {
    getEnumValues()
      .then((response) => {
        //console.log("response", response);
        this.setState({ enumValues: response });
      })
      .catch((error) => console.log(error));
  };

  componentDidMount() {
    this.findEnumValues();
  }

  render() {
    const enumValues = Object.entries(this.state.enumValues);
    // [["technologies", ["all", "api", browser,...]], []]

    return (
      <>
        {/* {enumValues.map((value,index) => (
          <Select
            key={index}
            mode="multiple"
            allowClear
            placeholder={value[0]}
            style={{ width: "100%" }}
            onChange={this.props.handleChange}
            rules={[
              {
                type: "array",
                max: 15,
              },
            ]}>
            {value[1].map((el, index) => (
              <Option key={index} value={el}>
                {el}
              </Option>
            ))}
          </Select>
        ))}  */}

        <TreeSelect
          showSearch
          style={{ width: "100%" }}
          value={this.state.value}
          dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
          placeholder="Filter by technologies, types, level, language and price"
          allowClear
          multiple
          treeDefaultExpandAll
          onChange={this.props.handleChange}>
          {enumValues.map((value, index) => (
            <TreeNode value={value[0]} title={value[0]}>
              {value[1].map((el, index) => (
                <TreeNode value={el} title={el} />
              ))}
            </TreeNode>
          ))}
        </TreeSelect>
      </>
    );
  }
}

export default Filters;
