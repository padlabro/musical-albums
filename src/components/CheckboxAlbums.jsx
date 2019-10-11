import React, { Component } from "react";
import styled from "styled-components";

const Input = styled.input.attrs({ type: "checkbox" })`
  display: none;
  & + span:before {
    content: "";
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 20px 20px;
    border: 3px solid white;
    position: absolute;
    left: 20px;
    top: 2px;
    opacity: 0.8;
    -webkit-transition: all 0.12s, border-color 0.08s;
    transition: all 0.12s, border-color 0.08s;
  }
  &:checked + span:before {
    width: 10px;
    top: -3px;
    left: 25px;
    border-radius: 0;
    opacity: 1;
    border-top-color: transparent;
    border-left-color: transparent;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;
const Label = styled.label`
  margin: 5px 20px;
  position: relative;
  display: block;
  padding-left: 50px;
  outline: none;
  background-color: transparent;
  border: 2px solid  ${ props => props.blue ?  "#87CEEB": "palevioletred"};
  text-align: center;
  border-radius: 20px 20px;
  min-width: 200px;
  min-height: 30px;
  color: black;
  & > input {
    outline: none;
  }
  & > span {
	margin-right:10px;
    color: white;
    user-select: none;
  }
  ${Input}:checked {
    background-color: white;
  }
`;


export default class Checkbox extends Component{
	render(){
		return(
			<Label key={this.props.value} blue={this.props.blue} inputColor={this.props.inputColor}>
			<Input value={this.props.value} onChange={this.props.choseAlbum}  defaultChecked={this.props.choose}/>
			<span>Album: {this.props.title}</span>
			<span>Artist: {this.props.name}</span>
          <span>Date: {this.props.date}</span>
		  </Label>
		)
	}
}