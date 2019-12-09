import React, { Component } from "react";
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
          <h1>Quantitative polimerase chain reaction analisys</h1>

          <p>
            Calculates the amplification efficiency and curves from real-time
            quantitative PCR (Polymerase Chain Reaction) data. Estimates the
            relative expression from PCR data using the double delta CT and the
            standard curve methods Livak & Schmittgen (2001). Tests for
            statistical significance using two-group tests and linear regression
            Yuan et al. (2006)
          </p>
        </div>

        <div>Aqui</div>
        <img src="http://localhost:8000/plot3" />
        <img src="http://localhost:8000/plot5" />
        <img src="http://localhost:8000/plot4" />
      </div>
    );
  };
}

export default Rplumber1;
/////<img src="http://localhost:8000/plot?randnum=30" />
