import React, { Component } from "react";
import "./register.styles.css";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /// cuando el boton recibe el valor lo pasa a values primero y despues se pasa al state del componente// despues toca usar bind para relacionar lo del cuadro y this
  /// target.name significa name email paswords para evitar escribirlos de a uno
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    //// despues se hace lo mismo para onsubmit dentro de forma.. toca bind tambien dentro del constructor
  }

  onSubmit(e) {
    e.preventDefault();

    let newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    console.log(newUser);
  }
  ///// axios or fetch

  render() {
    return (
      <div className="register_container">
        <div className="register">
          <div className="container">
            <div className="row">
              <div className="col-md-12 m-auto">
                <h2 className="display-7 text-center text-dark">
                  Create a new account
                </h2>
                <p className="lead text-center text-secondary">
                  It is also free and allways will be
                </p>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Name"
                      name="name"
                      value={this.state.name}
                      onChange={this.onChange}
                      ///onChange={this.onChange.bind(this)} esto es para pegar el campo con el state.. se puede hacer en el constructor o repitiendo esto en cada campo
                      ///required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      placeholder="Email Address"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                    <small className="form-text text-muted">
                      {/*                     This site uses Gravatar so if you want a profile image, use
                    a Gravatar email */}
                    </small>
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
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Confirm Password"
                      name="password2"
                      value={this.state.password2}
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

export default Register;
