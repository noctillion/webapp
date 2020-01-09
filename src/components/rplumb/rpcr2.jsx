import React, { Component } from "react";

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
        <div></div>
        <img src="http://localhost:8000/plot3" />
        <img src="http://localhost:8000/plot5" />
        <img src="http://localhost:8000/plot4" />
      </div>
    );
  };
}

export default Rplumber1;
/////<img src="http://localhost:8000/plot?randnum=30" />
