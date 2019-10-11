import React, { Component } from "react";
import styled from "styled-components";
import Button from "./Button";
import Title from "./Title";
import AlbumList from "./AlbumList";
import Input from "./InputText";

const Wrapper = styled.div`
  color: white;
  width: 500px;
  height: 750px;
  background-color: black;
  position: relative;
  border: solid 2px #87ceeb;
`;
const Form = styled.form`
  box-sizing: border-box;
  min-height: 100px;
  border-bottom: 2px solid #87ceeb;
`;
const Div = styled.div`
  color: white;
`;
const Span = styled.span`
  color: #87ceeb;
`;
export default class BaseDisplay extends Component {
  render() {
    return (
      <Wrapper>
        <Title text={"DATABASE"}></Title>
        <Form>
          <Input
            blue
            placeholder={"http://localhost:3004/albums"}
            onChange={this.props.changeUrl}
            value={this.props.urlValue}
          />
          <Button blue text={"Save URL"} onClick={this.props.saveUrl}></Button>
          <Div>
            DATABASE URL: <Span>{this.props.urlState}</Span>
          </Div>
          <Input
            blue
            placeholder={"Album ID"}
            onChange={this.props.changeId}
            value={this.props.id}
          />
          <Button blue text={"Delete"} onClick={this.props.deleteById}></Button>
          <Button blue text={"Add"} onClick={this.props.addById}></Button>
        </Form>
        <AlbumList
		  blue
		  spinner={this.props.spinner}
		  choose={this.props.choose}
          albums={this.props.albums}
          choseAlbum={this.props.choseAlbum}
          sendAlbums={this.props.sendAlbums}
		  error={this.props.error}
		  sendData={this.props.sendData}
          urlState={this.props.urlState}
        ></AlbumList>
        <Button text={"REFRESH"} onClick={this.props.refreshData}></Button>
        <Button text={"DELETE"} onClick={this.props.deleteData}></Button>
		<Button text={"CHOOSE ALL"} onClick={this.props.chooseAll} blue></Button>
		<Button text={"CHOOSE NOTHING"} onClick={this.props.chooseNothing} blue></Button>
      </Wrapper>
    );
  }
}
