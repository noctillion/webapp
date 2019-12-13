import React, { Component } from "react";
import { Link } from "react-router-dom";
import Separator from "../separator/separator.jsx";
//// para implementar el logout se conecta con redux
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";
/////
import "./navbar.styles.scss";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();

    ///console.log("aquidespuesde logout primero", this.props);
    window.location.href = "/"; /// TODO depronto es mejor modificando el state

    /// direccionar a mainpage cuando el usuario logout
  }

  render() {
    console.log("despuesderender", this.props);

    let { isAuthenticated, user } = this.props.auth;

    let authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/rplumb">
            qPCR
          </Link>
        </li>
        <li className="nav-item">
          <a
            href="#"
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
            {" "}
            {/* <img> aqui puede ir una imagen video 044</img> */}
            {/* <img> si se cambia el ul por img tambien se activa el nombre</img> */}
            <ul alt={user.name} className="logout"></ul>
            Logout
          </a>
        </li>
      </ul>
    );

    let guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark blue mb-3">
        <Separator />
        <div className="container">
          <Link className="navbar-brand" to="/">
            {" "}
            {/* href="landing.html" */}
            qPCRexpress
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/mirna">
                  Comunity
                </Link>
              </li>
            </ul>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

let mapStateToProps = state => ({
  auth: state.auth
});

//export default Navbar;
export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
  Navbar
);
