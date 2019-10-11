import React, { Component } from "react";
import Service from "../services/service";
import DatabaseDisplay from "../components/DatabaseDisplay";

export default class Base extends Component {
  state = {
    albums: [],
    chosenAlbumsNumber: [],
    idValue: "",
    urlValue: "http://localhost:3004/albums",
    urlState: "empty",
    id: "",
	error: false,
	choose:false,
	sendData:true,
	spinner:false
  };
  Service = new Service();

  componentDidUpdate = ()=>{
	  if ((this.props.sendData)&&(this.state.sendData)&&((!this.state.spinner))){
		  this.getData()
	  }
  }
  getData = async () => {
    try {
	this.setState({spinner:true})
      let responce = await this.Service.getResourceBase(this.state.urlState);
      this.updateAlbums(responce);
    } catch (err) {
      this.onError(err);
    }
  };

  updateAlbums = responce => {
    this.setState({ albums: false});
    let arr = [];
    responce.forEach(item => {
      arr.push({
        title: item.title,
        name: item["artist-credit"][0].artist.name,
        date: item.date,
        id: item.id
      });
	});
	if(this.props.sendData){
		this.setState({ albums: arr, error: false,sendData:false});
	}
	this.setState({ albums: arr, error: false,spinner:false});
  };

  onError = err => {
    this.setState({ error: true });
  };

  choseAlbum = event => {
    if (event.target.checked) {
      let x = event.target.value;
      this.setState(prevState => ({
        chosenAlbumsNumber: [...prevState.chosenAlbumsNumber, x]
      }));
    } else {
      let arr = this.state.chosenAlbumsNumber;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === event.target.value) {
          arr.splice(i, 1);
          break;
        }
      }
      this.setState({ chosenAlbumsNumber: arr });
    }
  };
  deleteData = async event => {
    this.setState({ chosenAlbumsNumber: [],	choose:false });
    event.preventDefault();
    let arr = [];
    for (let i = 0; i < this.state.chosenAlbumsNumber.length; i++) {
      arr.push(this.state.albums[this.state.chosenAlbumsNumber[i]].id);
    }
    await this.Service.deleteData(arr, this.state.urlState);
    this.setState({ albums: [] }, () => {
      this.getData();
    });
  };
  saveUrl = event => {
    event.preventDefault();
    this.setState(
      {
        urlState: this.state.urlValue,
        urlValue: "",
        error: false,
        albums: false
      },
      () => {
        this.getData();
      }
	);
    this.props.saveDatabaseUrl(this.state.urlValue);
  };
  changeUrl = event => {
    this.setState({ urlValue: event.target.value });
  };
  deleteById = async event => {
    event.preventDefault();
    await this.Service.deleteById(this.state.id, this.state.urlState);
    this.setState({ albums: false, id: "" }, () => {
      this.getData();
    });
  };
  addById = async event => {
    event.preventDefault();
    await this.Service.postResourceById(this.state.id, this.state.urlState);
    this.setState({ albums: false, id: "" }, () => {
      this.getData();
    });
  };
  changeId = event => {
    this.setState({ id: event.target.value });
  };
  chooseAll =async () => {
	let albums = this.state.albums
	let arr = []
	for(let i=0;i<albums.length;i++){
		arr.push(i)
	}
	await this.setState({ choose: true,albums:false,chosenAlbumsNumber:arr });
	this.setState({albums:albums})
  };
  chooseNothing =async () => {
	let albums = this.state.albums
	await this.setState({ choose: false,albums:false,chosenAlbumsNumber:[] });
	this.setState({albums:albums})
  };
  render() {
    return (
      <DatabaseDisplay
	  spinner={this.state.spinner}
        id={this.state.id}
        urlValue={this.state.urlValue}
        saveUrl={this.saveUrl}
        changeUrl={this.changeUrl}
        urlState={this.state.urlState}
        albums={this.state.albums}
        refreshData={this.getData}
        deleteData={this.deleteData}
        choseAlbum={this.choseAlbum}
        changeId={this.changeId}
        addById={this.addById}
        deleteById={this.deleteById}
		error={this.state.error}
		chooseAll={this.chooseAll}
		chooseNothing={this.chooseNothing}
		choose={this.state.choose}
		sendData={this.props.sendData}
      ></DatabaseDisplay>
    );
  }
}
