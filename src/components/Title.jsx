import React, { Component } from "react";
import styled from "styled-components";

const TitleTop = styled.div`
  margin-bottom: 15px;
  font-size: 30px;
  opacity: 1;
  ${props => (props.children==='DATABASE') ?
	'color:#87CEEB':'color:palevioletred'};
`;

export default class Title extends Component{
	render(){
		return(
			<TitleTop>{this.props.text}</TitleTop>
		)
	}
}