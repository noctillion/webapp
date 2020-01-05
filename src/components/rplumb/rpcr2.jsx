import React, { Component } from "react";

class Rplumber1 extends Component {
  componentDidMount = async () => {
    let resp = await fetch("https://159.89.83.159:8000/amef");
    let text = await resp.text();
    console.log(text);
    /// esto llama el end poin
  };
  render = () => {
    return (
      <div className="AppR">
        <div></div>
        <img src="https://159.89.83.159:8000/plot3" />
        <img src="https://159.89.83.159:8000/plot5" />
        <img src="https://159.89.83.159:8000/plot4" />
      </div>
    );
  };
}

export default Rplumber1;
/////<img src="https://159.89.83.159:8000/plot?randnum=30" />
