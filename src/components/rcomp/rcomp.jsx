import React from "react";

class Rcomp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
  }

  componentDidMount() {
    fetch("http://127.0.0.1:9188/echo")
      .then(response => response.json())
      .then(data => {
        this.setState({ data: data });
      });
  }

  render() {
    return <div>{this.state.data}</div>;
  }
}

export default Rcomp;
