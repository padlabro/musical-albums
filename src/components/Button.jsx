import React, { Component } from "react";
import styled from "styled-components";

const Buttton = styled.button`
  background: transparent;
  user-select: none;
  border-radius: 3px;
  border: 2px solid ${props => (props.blue ? "#87CEEB" : "palevioletred")};
  color: ${props => (props.blue ? "#87CEEB" : "palevioletred")};
  margin: 0 1em;
  padding: 0.25em 1em;
  ${props =>
    props.children === "Add to BASE"
      ? "position:absolute;bottom:-39px;left:35px;width:450px;background: black;padding: 10px;"
      : ""};
  ${props =>
    props.children === "REFRESH"
      ? "position:absolute;bottom:-39px;right:35px;width:205px;background: black;padding: 10px;border-color:#87CEEB;color:#87CEEB"
      : ""};
  ${props =>
    props.children === "DELETE"
      ? "position:absolute;bottom:-39px;left:35px;width:205px;background: black;padding: 10px;border-color:#87CEEB;color:#87CEEB"
      : ""};
  ${props =>
    ((props.children) === "CHOOSE NOTHING" && (props.blue))
      ? "position:absolute;bottom:400px;left:-135px;width:205px;background: black;padding: 10px;transform: rotate(-90deg)"
      : ""};
  ${props =>
    ((props.children === "CHOOSE ALL") && (props.blue))
      ? "position:absolute;bottom:200px;left:-135px;width:205px;background: black;padding: 10px;transform: rotate(-90deg);"
	  : ""};
	${props =>
	props.children === "CHOOSE NOTHING"
		? "position:absolute;bottom:400px;left:-135px;width:205px;background: black;padding: 10px;transform: rotate(-90deg)"
		: ""};
	${props =>
		props.children === "CHOOSE ALL"
		? "position:absolute;bottom:200px;left:-135px;width:205px;background: black;padding: 10px;transform: rotate(-90deg)"
		: ""};
	`;


export default class Button extends Component {
  render() {
    return (
      <Buttton
        blue={this.props.blue}
        onClick={this.props.onClick}
        type={this.props.type}
      >
        {this.props.text}
      </Buttton>
    );
  }
}
