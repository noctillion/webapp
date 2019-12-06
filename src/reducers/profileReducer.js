import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE
} from "../actions/types";

let initialState = {
  profile: null,
  profiles: null, //// esto representa un array de profiles
  loading: false /// esto es antes de fetch the resultados.. una vez pasa se vuelve verdadero.. sirce para poner espiners o algo
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };

    case GET_PROFILE:
      return {
        ...state, /// aqui se copia el estado actual y se modifica despues.. es decir que el estado original no cambia
        profile: action.payload, //// cuando se llama al endpoint si esta se pasa como payload el profile en el profileactions.js de ahy viene este  payload.. una vez carga se devuelve el loading del initial state a false
        loading: false
      };

    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };

    default:
      return state;
  }
}
