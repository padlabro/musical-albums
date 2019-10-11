import React, { Component } from "react";
import Search from "./Search";
import Database from "./Database";
import Popup from "../components/Popup";
export default class Main extends Component {
  state = {
    url: "",
	hidden: true,
	sendData:false
  };
  saveDatabaseUrl = databaseUrl => {
    this.setState({ url: databaseUrl });
    console.log(databaseUrl);
  };
  howPopup = () => {
    this.setState({ hidden: false });
  };
  sendAlbumsToDatabase=()=>{
	  this.setState({sendData:true})
	  this.setState({sendData:false})
  }
  render() {
    return (
      <>
        <Popup hidden={this.state.hidden}></Popup>
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
		  ChooseNothing={this.ChooseNothing}
		  ChooseAll={this.chooseAll}
		  sendData={this.state.sendData}
        />
      </>
    );
  }
}
