import React, { Component } from "react";
import { Link } from "react-router-dom";
///import FileUpload from "../fileuploader/FileUploader.jsx";
///import ImageFile from "../fileuploader/FileUploader2.jsx";
///import FileReader from "../fileuploader/FileUploader3.jsx";/// el que sirve papa
import Uploader from "../fileuploader/FileUploader5.jsx";
import "./rpcr1.style.css";

class Rplumber1 extends Component {
  componentDidMount = async () => {
    let resp = await fetch("http://localhost:8000/amef");
    let text = await resp.text();
    console.log(text);
    /// esto llama el end poin
  };

  render = () => {
    return (
      <div className="AppR">
        <div className="box1">
          <h1>Quantitative polimerase chain reaction analysis</h1>

          <p>
            This program calculates the amplification efficiency and curves from
            real-time quantitative PCR (Polymerase Chain Reaction) data.
            Estimates the relative expression from PCR data using the double
            delta CT and the standard curve methods Livak & Schmittgen (2001).
            Tests for statistical significance using two-group tests and linear
            regression Yuan et al. (2006)
          </p>
        </div>
        {/*         <div>Aqui</div>
        <button>Upload your csv files</button>
        <div>Aqui</div> */}
        <h4 style={{ padding: "10px" }}>Analyze your data</h4>
        <div>
          {/*           <Link to="/dashboard">
            <button type="button" className="btn btn-outline-success rounded-0">
              Send
            </button>
          </Link> */}

          {/*   <FileReader /> */}
          <Uploader />
        </div>
        <img className="plot plot1" src="http://localhost:8000/plot3" />
        <img className="plot plot2" src="http://localhost:8000/plot5" />
        <img className="plot plot3" src="http://localhost:8000/plot22" />
      </div>
    );
  };
}

export default Rplumber1;
/////<img src="http://localhost:8000/plot?randnum=30" />
