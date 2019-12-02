import React from "react";
import { Link } from "react-router-dom";
import Particles from "react-particles-js";
//import Particles from "./particles.jsx";
import "./mainpage.styles.scss";
//// para parar props aqui se trae redux.. lo enumero para claridad
// 1 impt shortcut vs
import PropTypes from "prop-types"; // esto es para poder mapStateToProps
import { connect } from "react-redux";

class Mainpage extends React.Component {
  ///// esto verifica que el usuario este autenticado, si es cierto redirecciona la url pagina al link que se especifica.. esto evita que la gente pase de paginas usando /
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">ProtocolBay</h1>
                {/*                 <p className="lead">
                  {" "}
                  Explore the interspecific predicted regulation by insect
                  miRNAs in A. thaliana
                </p> */}
                {/* <hr /> */}
                <h3>Document, share and discuss protocols and procedures</h3>
                <Particles
                  params={{
                    particles: {
                      number: {
                        value: 50
                      },

                      size: {
                        value: 3
                      },

                      color: { value: "#008000" }
                    },
                    interactivity: {
                      events: {
                        onhover: {
                          enable: true,
                          mode: "repulse"
                        }
                      }
                    }
                  }}
                />

                {/*                 <Link to="/register" className="btn btn-lg btn-info mr-2">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-light">
                  Login
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//4

Mainpage.propTypes = {
  auth: PropTypes.object.isRequired
};

// 3 esto trate auth al state
let mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Mainpage);
///export default Mainpage;
// 2 incluir connect en el export
// aqui se incluye mapStateToProps sin actions.. solo para tener acceso a auth
