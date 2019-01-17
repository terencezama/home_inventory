import { Types } from "..";
import { update } from "../types";

const INITIAL_STATE = {
  
  //user_logged_in, 
  //  -1 user not logged in
  //  0 undefined
  //  1 user logged in
  user_logged_in: 0,
  user: undefined,

}


export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.UPDATE_USER_LOGGEDIN:
      return {
        ...state,
        user_logged_in: action.payload
      }
    case Types.UPDATE_USER:
      return {
        ...state,
        user: action.payload
      }
    default:
      return state
  }
}