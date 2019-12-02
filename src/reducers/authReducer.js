//import { TEST_DISPATCH } from "../actions/types";
import isEmpty from "../validation/is-empty";
import { SET_CURRENT_USER } from "../actions/types.js";

let initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (
    action.type /// esto se va para el archivo
  ) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    /*  case TEST_DISPATCH:
      return {
        ...state,
        user: action.payload /// ahora tiene user data y lo despacha
      }; */ default:
      return state;
  }
}
