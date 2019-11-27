import axios from "axios";

let setAuthToken = token => {
  if (token) {
    // apply to every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    /// delete auth headre
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
