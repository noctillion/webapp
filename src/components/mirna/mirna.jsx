import React from "react";
import CytoscapeComponent from "react-cytoscapejs";
import genes from "../../data/genes.json";

class Mirna extends React.Component {
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
}

export default Mirna;
