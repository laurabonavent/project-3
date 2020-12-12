import React, { Component } from "react";

import { Link } from "react-router-dom";

export default class Card extends Component {
  state = { data: this.props.data };

  render() {
    const data = this.props.data;
    return (
      <div className="card-container">
        <Link to={`/ressources/${data._id}`}>
          <div className="card">
            <div className="card-top">
              <h2>{data.title}</h2>
              <ul className="card-technology">
                {data.technology.map((technology, index) => {
                  if (technology !== "") {
                    return <li key={index}>{technology}</li>;
                  }
                })}
              </ul>
            </div>
            <p>{data.description}</p>
            <ul className="card-type">
              {data.type.map((type, index) => {
                if (type !== "") {
                  return <li key={index}>{type}</li>;
                }
              })}
            </ul>
          </div>
        </Link>
      </div>
    );
  }
}
