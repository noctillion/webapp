//import { TEST_DISPATCH } from "../actions/types";

let initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (
    action.type /// esto se va para el archivo
  ) {
    /*  case TEST_DISPATCH:
      return {
        ...state,
        user: action.payload /// ahora tiene user data y lo despacha
      }; */ default:
      return state;
  }
}
