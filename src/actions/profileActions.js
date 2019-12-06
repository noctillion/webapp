import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE
} from "./types";

//
// funciones.. aqui se pone las funciones necesarias para cambiar el state

/// get current profile // es este lugar se establece el dispatcher de la funcion que se quiere usar.. despues se define la funcion

export let getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  ///dispatch(clearCurrentProfile()); //// esto lo puse yo
  axios
    .get("/api/profile")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// profile loading

export let setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

/// limpiar profile al logout

export let clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
