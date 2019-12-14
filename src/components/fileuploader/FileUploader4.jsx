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
    data.append("csvFile", this.state.selectedFile); /// reqyyyy es el nompre en params
    let options = {
      method: "POST",
      //headers: { Authorization: localStorage.getItem("token") },
      body: data
      //mode: "no-cors"
    };
    let response = await fetch("http://localhost:4000/api/upload", options);
    let resBody = await response.text();
    console.log("this is from endpoint", resBody);

    let options2 = {
      method: "GET",
      headers: { Accept: "application/json" }
      //mode: "no-cors"
    };
    let res = await fetch("http://localhost:4000/api/upload", options2);
    let newD = await res.text();
    let juju = JSON.parse(newD);
    let codecSV = juju.map(on => {
      return on.csvFile.replace(/\D+/g, "");
    })[0];
    console.log(typeof codecSV);

    /*    const myJson = await res.json(); //// dio igual que esperar res.text
    
    let newDat = JSON.stringify(myJson);
    let code = JSON.parse(newDat);
    let code2 = JSON.parse(JSON.stringify(myJson));

    console.log(typeof newDat);
    console.log(typeof code);

    console.log(newDat);
    console.log(code);
    console.log(code2);
    console.log(Object.keys(code));
    let gt = Object.keys(code);
    console.log(Object.getOwnPropertyNames(code)); */
  };

  render() {
    return (
      <div>
        <form className="App" onSubmit={this.handleUpload}>
          <input type="file" name="file" onChange={this.handleFileChange} />
          <button onClick={this.handleUpload}>Upload</button>
        </form>
      </div>
    );
  }
}
export default SimpleReactFileUpload;
