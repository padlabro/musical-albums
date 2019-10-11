import React, { Component } from "react";
import styled from "styled-components";

const InputText = styled.input`
  background: transparent;
  border-radius: 3px;
  border: 2px solid ${ props => props.blue ?  "#87CEEB": "palevioletred"};
  color:  ${ props => props.blue ?  "#87CEEB": "palevioletred"};
  margin:15px;
  padding: 4px;
  outline: none;
`;

export default class Input extends Component {
  render() {
    return <InputText blue={this.props.blue} onChange={this.props.onChange}  value = {this.props.value}placeholder={this.props.placeholder}></InputText>;
  }
}
