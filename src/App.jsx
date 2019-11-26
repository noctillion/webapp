import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux"; /// wraps everything provides the store
import store from "./store.js";

import Mainpage from "./components/mainpage/mainpage.jsx";
import Navbar from "./components/navbar/navbar.jsx";
import Register from "./components/auth/register/register.jsx";
import Login from "./components/auth/login/login.jsx";
import Mirna from "./components/mirna/mirna.jsx";
//import Footer from "./components/footer/footer.jsx";

// primero en redux usar provider y crear archivo store.js
// luego la carpeta reducers y su indice.. aqui se combinan
// despues se crean los reducers para los componentes

class App extends Component {
  render = () => {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Mainpage} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/mirna" component={Mirna} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  };
}
export default App;
