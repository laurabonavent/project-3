import React, { Component } from "react";

export default class Loading extends Component {
  render() {
    return (
      <div className='loading'>
        <h1>
          Catlover, <br />
          wait a minute...
        </h1>
        <img src='https://www.gif-maniac.com/gifs/1/539.gif' alt='' />
      </div>
    );
  }
}
