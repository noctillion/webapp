import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import CustomButton from "../custbutton/custom-button.component.jsx";
///import Spinner from "../common/Spinner.jsx";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    //console.log("current profile en dash", this.props.getCurrentProfile());
  }

  render() {
    /// despues de propTypes, se necesita saber que el profile no es null antes de render cualquier cosa para esto se hace lo siguiente: se traen user profiles y loading de props y se usa if para verificar que profile no es null
    let { user } = this.props.auth;
    let { profile, loading } = this.props.profile;

    let dashboardContent;

    //TODO ponet spiner en cargando

    if (profile == null || loading) {
      dashboardContent = <h1>cargando</h1>;
    } else {
      /// verificar si el usuario logueado tiene profile si no ofrecer opcion
      if (Object.keys(profile).length > 0) {
        dashboardContent = <h4> TODO display profile</h4>;
      }
      if (Object.keys(profile).length === 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name} </p>
            <p>Your profile is not complete, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create profile
            </Link>
            {/*            <CustomButton onClick={this.toNewProfileClick.bind(this)}>
              Create profile
            </CustomButton> */}
          </div>
        );
      }

      /*       else {
        //// user esta loggueado pero no tiene profile
        dashboardContent = (
          <div>
            <p>Welcome {user.name}></p>
            <p>Your profile is not complete, please add some info</p>
          </div>
        );
      } */
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

let mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
