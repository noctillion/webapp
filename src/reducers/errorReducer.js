import { GET_ERRORS } from "../actions/types";

let initialState = {}; // vacio donde se guardan los erroes

export default function(state = initialState, action) {
  switch (
    action.type /// esto se va para el archivo
  ) {
    case GET_ERRORS:
      return action.payload;

    default:
      return state;
  }
}
