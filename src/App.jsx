import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
/// estos tres se necesitan para mantener sesion una vez autenticada, esta estara abierta mientra el token este en el local storage
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
///
import { Provider } from "react-redux"; /// wraps everything provides the store
import store from "./store.js";

import Mainpage from "./components/mainpage/mainpage.jsx";
import Navbar from "./components/navbar/navbar.jsx";
import Register from "./components/auth/register/register.jsx";
import Login from "./components/auth/login/login.jsx";
import Mirna from "./components/mirna/mirna.jsx";
import Rcomp from "./components/rcomp/rcomp.jsx";
import Separator from "./components/separator/separator.jsx";

//import SearchBox from "./components/searchbox/searchbox.jsx";
//import Footer from "./components/footer/footer.jsx";

// primero en redux usar provider y crear archivo store.js
// luego la carpeta reducers y su indice.. aqui se combinan
// despues se crean los reducers para los componentes

/// check for token

if (localStorage.jwtToken) {
  // set auth token headre auth
  setAuthToken(localStorage.jwtToken);
  // decode token and get user info
  let decoded = jwt_decode(localStorage.jwtToken);
  /// set user and isAutenticated
  store.dispatch(setCurrentUser(decoded));

  // check for expired token
  let currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // LOGOUT USER
    store.dispatch(logoutUser());
    // falta limpiar el perfil del usuario
    // redireccionando al login
    window.location.href = "/login";
  }
}

class App extends Component {
  render = () => {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Separator />
            <Switch>
              <Route exact path="/" component={Mainpage} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/mirna" component={Mirna} />
              <Route exact path="/rcomp" component={Rcomp} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  };
}
export default App;
