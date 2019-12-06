import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    console.log("current profile en dash", this.props.getCurrentProfile());
  }
  render() {
    return (
      <div>
        <h1>Hola</h1>
      </div>
    );
  }
}

export default connect(null, { getCurrentProfile })(Dashboard);
