import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER
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

///// create profile

//// ejemplo de redux
///1)
// profile loading

export let createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile", profileData)
    .then(res => history.push("/dasboard")) //// aqui se redirecciona despues de mandarlo
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

/// borrar cuenta y perfil
// se usa dispatch por que se esta haciento un request a la base de datos

export let deleteAccount = () => dispatch => {
  if (window.confirm("This action will delete your qPCRexpress account")) {
    axios
      .delete("/api/profile")
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

///profile loading

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
