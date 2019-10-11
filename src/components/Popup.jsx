import React, { Component } from "react";
import styled from "styled-components";
import Button from "./Button";
const Wrapper = styled.div`
  color: white;
  position: absolute;
  top: ${props => (props.kek ? "-240px" : "88px")};
  width: 316px;
  height: 183px;
  border: 1px solid white;
  left: 43%;
  background-color: black;
  z-index: 1;
  transition-property: top;
  transition-duration: 0.3s;
`;

const AlmubList = styled.div`
  position: relative;
`;
const Div = styled.div`
box-sizing:border-box;
padding:15px
width: 316px;
height: 183px;
overflow-y: auto;
&::-webkit-scrollbar-button {
    background-image: url("");
    background-repeat: no-repeat;
    width: 6px;
    height: 0px;
  }

  &::-webkit-scrollbar-track {
    background-color: #32312e;
    box-shadow: 0px 0px 3px #000 inset;
  }

  &::-webkit-scrollbar-thumb {
    border: 1px solid white;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    background-color: black;
  }

  &::-webkit-scrollbar {
    width: 15px;
  }
`;
const Span = styled.div`
color:white;
font-size:24pt;
`;
export default class Popup extends Component {
  itemsRender = (albums, arr,issue) => {
	let item;
	  switch (issue){
		  case 'reAdd':item = arr.map((item, i) => (
			<div>
			  Album№{Number(item)+1} Title:{albums[i].title} is already in base
			</div>
		  ));
		  break
		  case'inputAlbumName':item = <Span>Please enter album name in input</Span>
		  break
		  case'emptyCheckbox':item = <Span>You must select at least one album</Span>
		  break
		  case'emptyUrl':item = <Span>Please enter DATABASE URL addres in input and Save it</Span>
		  break
		  default:item = <Span>Please enter album ID in input</Span>
	  }
	  return item;
  };

  render() {
    const items = this.itemsRender(this.props.albums, this.props.arr,this.props.issue);
    return (
      <>
        <Wrapper kek={this.props.hidden}>
		<Button text={"Close"} onClick={this.props.hidePopup}></Button>
          <Div>
            <AlmubList>{items}</AlmubList>
          </Div>
        </Wrapper>
      </>
    );
  }
}
