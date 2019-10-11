import React, { Component } from "react";
import AlbumList from "./AlbumList";
import Button from "./Button";
import styled from "styled-components";
import Input from "./InputText";
import Title from "./Title";
const Form = styled.form`
  box-sizing: border-box;
  padding-top: 30px;
  height: 134px;
  border-bottom: 2px solid palevioletred;
`;
const Wrapper = styled.div`
  height: 750px;
  background-color: black;
  position: relative;
  width: 550px;
  margin-right: 350px;
  border: solid 2px palevioletred;
`;

export default class SearchResult extends Component {
  render() {
    return (
      <Wrapper>
        <Title text={"SEARCH"}></Title>
        <Form>
          <Input
            placeholder="Name of album"
            type="text"
            onChange={this.props.inputAlbum}
            value={this.props.value}
          />
          <Button onClick={this.props.searchAlbums} text={"Search"}></Button>
        </Form>
        <AlbumList
			  spinner={this.props.spinner}
			choose={this.props.choose}
          albums={this.props.albums}
          choseAlbum={this.props.choseAlbum}
          sendAlbums={this.props.sendAlbums}
          error={this.props.error}
        />
        <Button onClick={this.props.sendAlbums} text={"Add to BASE"}></Button>
        <Button text={"CHOOSE ALL"}onClick={this.props.ChooseAll}></Button>
		<Button text={"CHOOSE NOTHING"}onClick={this.props.ChooseNothing}></Button>
      </Wrapper>
    );
  }
}
