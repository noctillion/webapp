import React from "react";
import genes from "../../data/genes.json";
import genesD3 from "../../data/dataD3.json";
import {
  Sigma,
  RandomizeNodePositions,
  RelativeSize,
  LoadJSON,
  SigmaEnableWebGL
} from "react-sigma";

class React_sigma extends React.Component {
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
        <h1>React sigma</h1>
        <Sigma graph={myGraph} settings={{ drawEdges: true, clone: false }}>
          <RelativeSize initialSize={15} />
          <RandomizeNodePositions />
        </Sigma>
      </div>
    );
  }
}

export default React_sigma;
