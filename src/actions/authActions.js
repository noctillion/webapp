import queryString from "query-string";
import { GET_ERRORS } from "./types.js";

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
    .then(res => console.log(res.data))
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
