import React, { Component } from "react";
import DarkRed from "../images/dark-red.svg";
import Yellow from "../images/yellow.svg";
import OrangeRed from "../images/orange-red.svg";

export default class BackGround extends Component {
  render() {
    return (
      <div>
        <img className='dark-red svg-background' src={DarkRed} alt='' />
        <img className='yellow svg-background' src={Yellow} alt='' />
        <img className='orange-red svg-background' src={OrangeRed} alt='' />
      </div>
    );
  }
}
