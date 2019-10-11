import React, { Component } from "react";
import styled from "styled-components";

const Div = styled.div`
position: absolute;
top:${ props => props.kek ? '-200px': '0px'};;
width: 300px;
height:200px;
background-color:white;
z-index:1;
transition-property: top;
transition-duration: .1s;
`
export default class Popup extends Component {
	render(){
		return (
			<Div kek={this.props.hidden}></Div>
		)
	}
}