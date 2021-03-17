import {
  USER_LISTS_REQUEST,
  USER_LISTS_SUCCESS,
  USER_LISTS_FAIL,
  USER_LISTS_RESET,
} from "../constants/listContstants";

export const usersListsReducer = (state = { lists: [] }, action) => {
  switch (action.type) {
    case USER_LISTS_REQUEST:
      return {
        loading: true,
      };
    case USER_LISTS_SUCCESS:
      return {
        loading: false,
        lists: action.payload,
      };
    case USER_LISTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_LISTS_RESET:
      return {
        lists: [],
      };
    default:
      return state;
  }
};
