import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import queryString from "query-string";
import { GET_ERRORS } from "./types.js";
import { SET_CURRENT_USER } from "./types";

/// REGISTER USER

/* export let registerUser = userData => {
  return {
    type: TEST_DISPATCH,
    payload: userData
  };
}; */

export let registerUser = (userData, history) => dispatch => {
  fetch("http://localhost:4000/api/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" }, // this line is important, if this content-type is not set it wont work
    body: queryString.stringify(userData)
  })
    //.then(res => console.log(res.data))
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// login - get user token
/* export let loginUser = userData => dispatch => {
  fetch("http://localhost:4000/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" }, // this line is important, if this content-type is not set it wont work
    body: queryString.stringify(userData)
  })
    .then(res => {
      /// save to local storage
      let { token } = res.data;
      // set token to local storage
      localStorage.setItem("jwtToken", token);
      // sed token to auth header.. para eso hacemos una funcion
      setAuthToken(token);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}; */

//// intento con axios

export let loginUser = userData => dispatch => {
  axios
    .post("http://localhost:4000/api/users/login", userData)
    .then(res => {
      /// save to local storage
      let { token } = res.data;
      /// set token to local storage
      localStorage.setItem("jwtToken", token);
      // set token to auth header
      setAuthToken(token);
      /// decode token to get user data
      let decoded = jwt_decode(token);
      console.log("decoded", decoded);

      /// hasta aquifunciona
      /// set current user
      dispatch(setCurrentUser(decoded));
      console.log("setCurrentUser", setCurrentUser);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//// set logged used

export let setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
