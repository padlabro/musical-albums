import React, { Component } from "react";
import styled from "styled-components";
import Checkbox from "./CheckboxAlbums";
import Spinner from './spinner/Spinner.svg'

const Form = styled.form`
  padding: 20px 0px;
  overflow-y: scroll;
  height:525px;
  &::-webkit-scrollbar-button {
	background-image:url('');
	background-repeat:no-repeat;
	width:6px;
	height:0px
	}
	
	&::-webkit-scrollbar-track {
	background-color:#32312e;
	box-shadow:0px 0px 3px #000 inset;
	}
	
	&::-webkit-scrollbar-thumb {
	border:1px solid ${props=>props.blue ?  "#87CEEB": "palevioletred"};
	-webkit-border-radius: 5px;
	border-radius: 5px;
	background-color:black;
	}

	
	&::-webkit-scrollbar{
	width: 15px;
	}
`;
const Div = styled.div`
margin: 35px;
color: 	#DC143C;
font-size: 23pt;
`

export default class AlbumList extends Component {
  renderItems(props) {
	if(this.props.spinner){
		console.log('nuyatut')
		return <img src={Spinner} alt="spinner"/>
	}
    let albums=props;
	if (albums.length>0){
		const AlbumsArray = albums.map((item, i) => (
			<Checkbox
			choose={this.props.choose}
			  blue={this.props.blue}
			  key={i}
			  value={i}
			  choseAlbum={this.props.choseAlbum}
			  title={item.title}
			  name={item.name || item["artist-credit"][0].artist.name}
			  date={item.date || 'No date'}
			/>
		  ));
		  return AlbumsArray;
	}if(albums){
		return <Div>No results</Div>
	}
  }
  render() {
	  if (this.props.error||this.props.sendData){
		return <Div>Error! Failed to fetch. </Div>
	  }
    const items = this.renderItems(this.props.albums);
    return <Form blue={this.props.blue}> {items}</Form>;
  }
}
