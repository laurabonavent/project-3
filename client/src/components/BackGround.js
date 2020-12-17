import React, { Component } from "react";
import DarkRed from "../images/background-purple.svg";
import Yellow from "../images/background-red.svg";
import OrangeRed from "../images/background-orange.svg";

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
