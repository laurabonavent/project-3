import React from "react";
import { getEnumValues } from "./auth/auth-service";
import { TreeSelect } from "antd";
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
            <TreeNode value={value[0]} title={value[0]} key={value[0]}>
              {value[1].map((el, index) => (
                <TreeNode value={el} title={el} key={el} />
              ))}
            </TreeNode>
          ))}
        </TreeSelect>
      </>
    );
  }
}

export default Filters;