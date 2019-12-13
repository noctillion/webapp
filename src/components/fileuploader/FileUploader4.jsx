import React, { Component } from "react";

class SimpleReactFileUpload extends Component {
  state = { selectedFile: null };

  handleFileChange = event => {
    this.setState({
      selectedFile: event.target.files[0]
    });
  };
  handleUpload = async event => {
    // define upload
    event.preventDefault();
    const data = new FormData();
    console.log(this.state.selectedFile, "selected file");
    data.append("reqyyyye", this.state.selectedFile); /// reqyyyy es el nompre en params
    let options = {
      method: "POST",
      //headers: { Authorization: localStorage.getItem("token") },
      body: data
      //mode: "no-cors"
    };
    let response = await fetch("http://localhost:8000/file", options);
    let resBody = await response.text();
    console.log("this is from endpoint", resBody);
  };

  render() {
    return (
      <form className="App" onSubmit={this.handleUpload}>
        <input type="file" name="file" onChange={this.handleFileChange} />
        <button onClick={this.handleUpload}>Upload</button>
      </form>
    );
  }
}
export default SimpleReactFileUpload;
