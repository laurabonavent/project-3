import React from "react";

class SearchBar extends React.Component {
  render() {
    return (
      <>
        <input
          className="search-bar"
          type="search"
          name="search"
          placeholder="Search..."
          onChange={this.props.handleChange}
        />
      </>
    );
  }
}

export default SearchBar;
