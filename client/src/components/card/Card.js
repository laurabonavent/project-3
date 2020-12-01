import React, { Component } from "react";

import { Link } from "react-router-dom";

export default class Card extends Component {
  state = { data: this.props.data };

  render() {
    const data = this.props.data;
    return (
      <div>
        {/* {data.map((data, index) => { */}
        {/* return ( */}
        <div>
          <Link to={`/ressources/${data.id}`}>{data.title}</Link>

          <p>{data.description}</p>
          <ul>
            {data.type.map((type, index) => (
              <li key={index}>{type}</li>
            ))}
          </ul>
        </div>
        {/* )})} */}
      </div>
    );
  }
}
