import React, { Component } from "react";
import Papa from "papaparse";

class FileReader extends React.Component {
  constructor() {
    super();
    this.state = {
      csvfile: undefined
    };
    this.updateData = this.updateData.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }
  submitHandler = event => {
    event.preventDefault();
    console.log("aqui handler");
  };

  handleChange = event => {
    this.setState({
      csvfile: event.target.files[0]
    });
  };

  importCSV = () => {
    const { csvfile } = this.state;
    Papa.parse(csvfile, {
      complete: this.updateData,
      header: true
    });
  };

  updateData(result) {
    var data = result.data;
    console.log("esto es data", data);
  }

  render() {
    console.log(this.state.csvfile);
    return (
      <div className="App">
        <h2>Import CSV File!</h2>
        <form onSubmit={this.submitHandler}>
          <input
            className="csv-input"
            type="file"
            ref={input => {
              this.filesInput = input;
            }}
            name="file"
            placeholder={null}
            onChange={this.handleChange}
          />
          <p />
          <button type="submit" onClick={this.importCSV}>
            {" "}
            Upload your file
          </button>
        </form>
      </div>
    );
  }
}

export default FileReader;
