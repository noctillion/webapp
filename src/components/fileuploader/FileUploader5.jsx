import React from "react";
import { render } from "react-dom";
import { CsvToHtmlTable } from "react-csv-to-table";
import ReactFileReader from "react-file-reader";

const sampleData = `
 LOX2 ,14.7,8,440,230,3.23,5.345,17.42,0,0,3,4
GFPT 128,32.4,4,78.7,66,4.08,2.2,19.47,1,1,4,1
`;

class Uploader extends React.Component {
  state = {
    csvData: null
  };

  handleFiles = async files => {
    var reader = new FileReader();
    reader.onload = async e => {
      // Use reader.result
      this.setState({
        csvData: reader.result
      });
      console.log("datacsv", this.state.csvData);

      const response = await fetch("/file", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.

        body: this.state.csvData
      });
      //return await response.json();
    };
    reader.readAsText(files[0]);
  };

  render() {
    return (
      <div>
        <ReactFileReader
          multipleFiles={false}
          fileTypes={[".csv"]}
          handleFiles={this.handleFiles}
        >
          {/* <input type="file" onChange={this.handleFiles} value="boton" /> */}
          {/* upload to{" "}
          </input> */}
          <button className="btn btn-outline-success ml-3 mb-4">Upload</button>
        </ReactFileReader>
        <CsvToHtmlTable
          data={this.state.csvData || sampleData}
          csvDelimiter=","
          tableClassName="table table-striped table-hover"
        />
      </div>
    );
  }
}
export default Uploader;
