import React from "react";
import CytoscapeComponent from "react-cytoscapejs";
import genes from "../../data/genes.json";
import genesD3 from "../../data/dataD3.json";
import {
  Sigma,
  RandomizeNodePositions,
  RelativeSize,
  LoadJSON
} from "react-sigma";

import Script from "react-load-script";

//import { Helmet } from "react-helmet";

/* class Mirna extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let elements = genes;

    return (
      <CytoscapeComponent
        elements={elements}
        style={{ width: "1400px", height: "500px" }}
      />
    );
  }
} */

class Mirna extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleScriptCreate() {
    this.setState({ scriptLoaded: false });
  }

  handleScriptError() {
    this.setState({ scriptError: true });
  }

  handleScriptLoad() {
    this.setState({ scriptLoaded: true });
  }

  render() {
    let elements = genes;
    /*     let myGraph = {
      nodes: [
        { id: "n1", label: "Alice" },
        { id: "n2", label: "Rabbit" }
      ],
      edges: [{ id: "e1", source: "n1", target: "n2", label: "SEES" }]
    }; */

    let myGraph = genesD3; /// vienen de usar d3_igraph(karate)

    return (
      <div>
        <Sigma graph={myGraph} settings={{ drawEdges: true, clone: false }}>
          <RelativeSize initialSize={15} />
          <RandomizeNodePositions />
        </Sigma>
        <CytoscapeComponent
          elements={elements}
          style={{ width: "1400px", height: "500px" }}
        />
        <Script
          url="../../../build/script.script" /// no lo encuentre
          onCreate={this.handleScriptCreate.bind(this)}
          onError={this.handleScriptError.bind(this)}
          onLoad={this.handleScriptLoad.bind(this)}
        />
      </div>
    );
  }
}

export default Mirna;
