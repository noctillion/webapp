import React, { Component } from "react";

class CsvUpload extends Component {
  constructor() {
    super();
    this.state = {
      csv: null
    };
  }
  onChange(e) {
    let files = e.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = e => {
      console.warn("csv data", e.target.result);
    };
  }

  render() {
    return (
      <div onSubmit={this.onFormSubmit}>
        <h1>Upload csv file</h1>
        <input type="file" name="file" onChange={e => this.onChange(e)}></input>
      </div>
    );
  }
}

export default CsvUpload;
