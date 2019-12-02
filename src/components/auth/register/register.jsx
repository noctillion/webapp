import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import "./register.styles.css";
//import queryString from "query-string";
///import axios from "axios";
import classnames from "classnames";
import { connect } from "react-redux";
import { registerUser } from "../../../actions/authActions";

class Register extends Component {
  constructor() {
    super();

    /// PILAS!!!! cada campo debe tener su propio state en el componente
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

  ///// esto verifica que el usuario este autenticado, si es cierto redirecciona la url pagina al link que se especifica.. esto evita que la gente pase de paginas usando /
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  /// cuando el boton recibe el valor lo pasa a values primero y despues se pasa al state del componente// despues toca usar bind para relacionar lo del cuadro y this
  /// target.name significa name email paswords para evitar escribirlos de a uno
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value }); // target es reemplazado por el value del campo ej name email
    //// despues se hace lo mismo para onsubmit dentro de forma.. toca bind tambien dentro del constructor.. eto es oara que se reconozca this
  }

  onSubmit(e) {
    e.preventDefault();

    let newUser = {
      name: this.state.name, /// estos se toman de la forma en el componente
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    console.log(newUser);
    ///// axios or fetch
    ////probablemente se necesita el http ya que no se configuto en el proxy de la app
    /*     axios
      .post("/api/users/register", newUser)
      .then(res => console.log(res.data))
      .catch(err => console.log(err)); */

    this.props.registerUser(newUser, this.props.history); // this.props.history se agrega para el enrutamiento con withrouter y las accciones.. el reenvio ejemplo

    /*     fetch("http://localhost:4000/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" }, // this line is important, if this content-type is not set it wont work
      body: queryString.stringify(newUser)
    }); */
    //// se va pata authActions
  }

  render() {
    let { errors } = this.state;
    ///let { user } = this.props.auth;
    return (
      <div className="register_container">
        <div className="register">
          {/* {user ? user.name : null} */}
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
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.name
                      })}
                      placeholder="Name"
                      name="name"
                      value={this.state.name}
                      onChange={this.onChange}
                      //// esto pone errores en el dom poniendo un tag en className que viene de bootstrap

                      ///onChange={this.onChange.bind(this)} esto es para pegar el campo con el state.. se puede hacer en el constructor o repitiendo esto en cada campo
                      ///required
                    />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>
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
                    <small className="form-text text-muted">
                      {/*                     This site uses Gravatar so if you want a profile image, use
                    a Gravatar email */}
                    </small>
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
                  <div className="form-group">
                    <input
                      type="password"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.password2
                      })}
                      placeholder="Confirm Password"
                      name="password2"
                      value={this.state.password2}
                      onChange={this.onChange}
                    />
                    {errors.password2 && (
                      <div className="invalid-feedback">{errors.password2}</div>
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

let mapStateToProps = state => ({
  auth: state.auth, // this .auth viene de index.js en reducers folder
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
