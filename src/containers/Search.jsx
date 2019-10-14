import React, { Component } from "react";
import Service from "../services/service";
import SearchDisplay from "../components/SearchDisplay";

export default class Search extends Component {
  state = {
    albumName: "",
    albums: false,
    chosenAlbumsNumber: [],
    urlDatabase: "",
    error: false,
    choose: false,
    spinner: false
  };

  Service = new Service();

  inputAlbum = event => {
    this.setState({ albumName: event.target.value });
  };

  searchAlbums = async event => {
    event.preventDefault();
    if (!this.state.albumName) {
      this.props.showPopup("inputAlbumName");
    } else {
      this.setState({ spinner: true });
      let albums = await this.Service.getResource(this.state.albumName);
      if (albums) {
        this.setState({ albums: false, choose: false });
        this.setState({
          albumName: "",
          albums: albums.releases,
          error: false,
          spinner: false
        });
      } else {
        this.setState({ error: true, spinner: false });
      }
    }
  };

  sendAlbums = async event => {
    if (this.state.chosenAlbumsNumber.length > 0 && this.state.urlDatabase) {
      this.setState({ spinner: true });
      event.preventDefault();
      let albums = this.state.albums;
      let arr = [];
      for (let i = 0; i < this.state.chosenAlbumsNumber.length; i++) {
        arr.push(this.state.albums[this.state.chosenAlbumsNumber[i]]);
      }
      let res = await this.Service.postResourceArray(
        arr,
        this.state.urlDatabase,
        this.state.chosenAlbumsNumber
      );
      console.log(res);
      if (!res) {
        this.setState({ spinner: false });
      } else {
        if (res.length === 0) {
          await this.setState({ albums: false, choose: false, spinner: false });
          this.props.sendAlbumsToDatabase();
          this.setState({ chosenAlbumsNumber: [], albums: albums });
        } else {
          this.props.sendAlbumsToDatabase();
          this.props.showPopup("reAdd", res, this.state.albums);
          this.setState({ spinner: false });
        }
      }
    } else {
      console.log(this.state.urlDatabase);
      if (this.state.urlDatabase) {
        this.props.showPopup("emptyCheckbox");
      } else {
        this.props.showPopup("emptyUrl");
      }
    }
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
        // eslint-disable-next-line
        if (arr[i] == event.target.value) {
          arr.splice(i, 1);
          break;
        }
      }
      this.setState({ chosenAlbumsNumber: arr });
    }
  };
  ChooseAll = async () => {
    let albums = this.state.albums;
    let arr = [];
    for (let i = 0; i < albums.length; i++) {
      arr.push(i);
    }
    await this.setState({
      choose: true,
      albums: false,
      chosenAlbumsNumber: arr
    });
    this.setState({ albums: albums });
  };
  ChooseNothing = async () => {
    let albums = this.state.albums;
    await this.setState({
      choose: false,
      albums: false,
      chosenAlbumsNumber: []
    });
    this.setState({ albums: albums });
  };

  static getDerivedStateFromProps(props, state) {
    if (props.databaseUrl === state.urlDatabase) {
      return null;
    }
    return { urlDatabase: props.databaseUrl };
  }

  render() {
    return (
      <SearchDisplay
        spinner={this.state.spinner}
        albums={this.state.albums}
        searchAlbums={this.searchAlbums}
        inputAlbum={this.inputAlbum}
        value={this.state.albumName}
        choseAlbum={this.choseAlbum}
        sendAlbums={this.sendAlbums}
        error={this.state.error}
        ChooseAll={this.ChooseAll}
        ChooseNothing={this.ChooseNothing}
        choose={this.state.choose}
      />
    );
  }
}
