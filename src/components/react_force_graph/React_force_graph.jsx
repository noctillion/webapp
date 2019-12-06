import {
  ForceGraph2D,
  ForceGraph3D,
  ForceGraphVR,
  ForceGraphAR
} from "react-force-graph";

//import ForceGraph3D from "react-force-graph-3d";
import genes from "../../data/data_sigma.json";
// import Graph from "../../lib";

// import Graph from 'react-graph-vis'

import React from "react";

class React_force_graph extends React.Component {
  render() {
    return (
      <div>
        <h1>Force graph vr</h1>
        <ForceGraph3D graphData={genes} />
      </div>
    );
  }
}

export default React_force_graph;
