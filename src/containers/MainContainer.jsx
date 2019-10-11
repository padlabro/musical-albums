import React, { Component } from "react";
import Search from "./Search";
import Database from "./Database";
import Popup from "../components/Popup";
export default class Main extends Component {
  state = {
    url: "",
	hidden: true,
	sendData:false,
	albumNumbers:[],
	albums:[],
	issue:''

  };
  saveDatabaseUrl = databaseUrl => {
    this.setState({ url: databaseUrl });

  };
  showPopup = (issue,arr,albums) => {
		this.setState({ hidden: false,albumNumbers:arr,albums:albums, issue:issue});
  };
  hidePopup = ()=>{
	  this.setState({hidden:true})
  }
  sendAlbumsToDatabase=()=>{
	  this.setState({sendData:true})
	  this.setState({sendData:false})
  }
  render() {
	console.log('RENDER___MAINCOMPONENT')
    return (
      <>
        <Popup hidden={this.state.hidden} arr={this.state.albumNumbers} albums={this.state.albums} hidePopup={this.hidePopup} issue={this.state.issue}>
		</Popup>
        <Search
          databaseUrl={this.state.url}
          showPopup={this.showPopup}
          choose={this.state.chooseSearch}
          ChooseNothing={this.ChooseNothing}
		  ChooseAll={this.chooseAll}
		  sendAlbumsToDatabase={this.sendAlbumsToDatabase}
        />
        <Database
          saveDatabaseUrl={this.saveDatabaseUrl}
		  choose={this.state.chooseData}
		  showPopup={this.showPopup}
		  ChooseNothing={this.ChooseNothing}
		  ChooseAll={this.chooseAll}
		  sendData={this.state.sendData}
        />
      </>
    );
  }
}
