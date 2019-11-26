import React, { Component } from "react";
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

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();

    let user = {
      email: this.state.email,
      password: this.state.password
    };
    console.log(user);
  }

  render() {
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
                      className="form-control form-control-lg"
                      placeholder="Email Address"
                      name="email"
                      value={this.state.name}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Password"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
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

export default Login;
