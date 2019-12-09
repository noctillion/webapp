import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom"; //// esto es necesario para direccionar rutas y usar el history
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup.jsx";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup.jsx";
import InputGroup from "../common/InputGroup.jsx";
import SelectListGroup from "../common/SelectListGroup.jsx";
import ImageUpload from "../common/ImageUpload.jsx";
import { createProfile } from "../../actions/profileActions"; //// es una accion

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      displayBioInputs: false,
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
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    console.log("submit profile");

    let profileData = {
      handle: this.state.handle,
      company: this.state.company,
      location: this.state.location,
      status: this.state.status,
      bio: this.state.bio
    };

    this.props.createProfile(profileData, this.props.history); //// todo lo que venga de action redux estara en props
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    let { errors, displayBioInputs } = this.state;

    let bioInputs;

    if (displayBioInputs) {
      bioInputs = (
        <div>
          <TextAreaFieldGroup
            placeholder="About you"
            name="bio"
            value={this.state.bio}
            onChange={this.onChange}
            error={errors.bio}
            info="Share a little bio with the comunity"
          />
        </div>
      );
    } else {
    }

    /// opciones para el status.. lo cambiare a academic condition
    let options = [
      { label: "* Select your academic status", value: 0 },
      { label: "PI researcher", value: "PI researcher" },
      { label: "Associate researcher", value: "Associate researcher" },
      { label: "Postdoc researcher", value: "Postdoc researcher" },
      { label: "PhD", value: "PhD" },
      { label: "MSc", value: "MSc" },
      { label: "BSc", value: "BSc" },
      { label: "Other", value: "Other" }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-6auto">
              <h1 className="display-6 text-center">Create your profile</h1>
              <p className="lead text-center">
                Give some information for your profile
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Nickname"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="Select a nickname to manage your MyLabBook account"
                />
                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  options={options}
                  error={errors.status}
                  info="Please select your academic condition"
                />
                <TextFieldGroup
                  placeholder="Laboral afiliation"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Please provide information about your laboral afiliation"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="Where are you located? (eg. Montreal, CA)"
                />
                {/*                 <TextAreaFieldGroup
                  placeholder="About you"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Share a little bio with the comunity"
                /> */}
                <div className="mb-3">
                  <button
                    type="button" //// si esto no se pone envia el form por default
                    onClick={() => {
                      this.setState(prevState => ({
                        displayBioInputs: !prevState.displayBioInputs
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add bio
                  </button>
                  <span className="text-muted"></span>
                </div>
                {bioInputs}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
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

export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);
// para poder redireccionar toca usar withrouter
