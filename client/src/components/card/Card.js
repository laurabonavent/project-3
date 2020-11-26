import React, { Component } from "react";

export default class Card extends Component {
  state = { data: this.props.data };

  render() {
    const data = this.props.data;
    return (
      <div>
        {data.map((data, index) => {
          return (
            <>
              <a href={data.link} rel="noreferrer" target="_blank">
                {data.title}
              </a>

              <p>{data.description}</p>
              <ul>
                {data.type.map((type, index) => (
                  <li key={index}>{type}</li>
                ))}
              </ul>
            </>
          );
        })};
      </div>
    );
  }
}
