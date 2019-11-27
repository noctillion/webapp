import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { loginUser } from "../../../actions/authActions";
import "./login.style.css";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAutenticated) {
      this.props.history.push("http://localhost:4000/mirna");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();

    let userData = {
      email: this.state.email,
      password: this.state.password
    };
    console.log(userData);
    this.props.loginUser(userData);
  }

  render() {
    let { errors } = this.state;

    return (
      <div className="login_container">
        <div className="login">
          <div className="container">
            <div className="row">
              <div className="col-md-12 m-auto">
                <h3 className="display-7 text-center text-dark text_t">
                  Log into ProtocolBay
                </h3>
                {/*                 <p className="lead text-center">
                  Sign in to your DevConnector account
                </p> */}
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      type="email"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.email
                      })}
                      placeholder="Email Address"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.password
                      })}
                      placeholder="Password"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                  <input type="submit" className="btn btn-block blue mt-2" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

let mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
