import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup.jsx";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup.jsx";
import InputGroup from "../common/InputGroup.jsx";
import SelectListGroup from "../common/SelectListGroup.jsx";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      location: "",
      status: "",
      website: "",
      bio: "",
      skills: "",
      githubusername: "",
      youtube: "",
      facebook: "",
      linkedin: "",
      twitter: "",
      errors: {}
    };
  }
  render() {
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 mauto">
              <h1 className="display-4 text-center">Create your profile</h1>
              <p className="lead text-center">
                Give some information for your profile
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

CreateProfile.propTypes = {};
let mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps)(CreateProfile);
