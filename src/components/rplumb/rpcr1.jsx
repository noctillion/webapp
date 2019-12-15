import React, { Component } from "react";
import { Link } from "react-router-dom";
///import FileUpload from "../fileuploader/FileUploader4";
///import ImageFile from "../fileuploader/FileUploader2.jsx";
///import FileReader from "../fileuploader/FileUploader3.jsx";/// el que sirve papa
import Uploader from "../fileuploader/FileUploader5.jsx";
import SimpleReactFileUpload from "../fileuploader/FileUploader4.jsx";
import EfficiencyPcrComp from "../fileuploader/EfficiencyCalculator.jsx";
import "./rpcr1.style.css";

class Rplumber1 extends Component {
  componentDidMount = async () => {
    //// EJEMPLO FUNCIONAL CON POST// EL CODIGO FILE CAMBIA CADA VEZ
    /*     let options3 = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      }
      //body: datat
      //mode: "no-cors"
    };
    let respe = await fetch(
      "http://localhost:8000/amepleff?file=1576393048841&gv1=brain&gv2=kidney&eacH=6&refGe=GAPDH&refGr=brain",
      options3
    );
    let texte = await respe.text();
    console.log(texte);
 */

    /// esto llama el end point

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
        <div className="separatorc"></div>
        <h5 style={{ padding: "10px" }}>qPCR analysis</h5>
        <div>
          {/*           <Link to="/dashboard">
            <button type="button" className="btn btn-outline-success rounded-0">
              Send
            </button>
          </Link> */}

          {/*   <FileReader /> */}
          <div className="separatorc"></div>
          <div className="containerA">
            <div className="uploader">
              {" "}
              <Uploader />
            </div>
            {/* <div className="separatorc"></div> */}

            <div>
              <EfficiencyPcrComp />
            </div>

            <div className="graphContainer">
              <div className="graphtypeA graph1">
                <h5> Simple Amplification relation graph</h5>
                <SimpleReactFileUpload />
              </div>

              <div className="graphtypeA graph1">
                <h5> Efficiency correlation graph</h5>
                <SimpleReactFileUpload />
              </div>
            </div>
          </div>
        </div>
        {/*  <img className="plot plot1" src="http://localhost:8000/plot3" /> */}
      </div>
    );
  };
}

export default Rplumber1;
/////<img src="http://localhost:8000/plot?randnum=30" />
