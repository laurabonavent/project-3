import React, { Component } from "react";
import DarkRed from "../images/dark-red.svg";
import Yellow from "../images/yellow.svg";
import OrangeRed from "../images/orange-red.svg";

export default class BackGround extends Component {
  render() {
    return (
      <div>
        <img className='dark-red' src={DarkRed} alt='' />
        <img className='yellow' src={Yellow} alt='' />
        <img className='orange-red' src={OrangeRed} alt='' />
      </div>
    );
  }
}
