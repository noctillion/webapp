import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Mainpage from "./components/mainpage/mainpage.jsx";
import Navbar from "./components/navbar/navbar.jsx";
import Register from "./components/auth/register/register.jsx";
import Login from "./components/auth/login/login.jsx";
//import Footer from "./components/footer/footer.jsx";

class App extends Component {
  render = () => {
    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Mainpage} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </div>
      </Router>
    );
  };
}
export default App;
