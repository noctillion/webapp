import React from "react";
import { Link } from "react-router-dom";
import Particles from "react-particles-js";
//import Particles from "./particles.jsx";
import "./mainpage.styles.scss";

class Mainpage extends React.Component {
  constructor(props) {
    super(props);
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

export default Mainpage;
