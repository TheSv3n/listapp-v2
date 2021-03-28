import {
  USER_LISTS_REQUEST,
  USER_LISTS_SUCCESS,
  USER_LISTS_FAIL,
  USER_LISTS_RESET,
  SHARED_LISTS_REQUEST,
  SHARED_LISTS_SUCCESS,
  SHARED_LISTS_FAIL,
  SHARED_LISTS_RESET,
  CREATE_LIST_REQUEST,
  CREATE_LIST_SUCCESS,
  CREATE_LIST_FAIL,
  CREATE_LIST_RESET,
  LIST_INFO_REQUEST,
  LIST_INFO_SUCCESS,
  LIST_INFO_FAIL,
  LIST_INFO_RESET,
  LIST_SHARE_ADD_REQUEST,
  LIST_SHARE_ADD_SUCCESS,
  LIST_SHARE_ADD_FAIL,
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

export const sharedListsReducer = (state = { sharedLists: [] }, action) => {
  switch (action.type) {
    case SHARED_LISTS_REQUEST:
      return {
        loading: true,
      };
    case SHARED_LISTS_SUCCESS:
      return {
        loading: false,
        sharedLists: action.payload,
      };
    case SHARED_LISTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case SHARED_LISTS_RESET:
      return {
        sharedLists: [],
      };
    default:
      return state;
  }
};

export const listCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_LIST_REQUEST:
      return {
        loading: true,
      };
    case CREATE_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        list: action.payload,
      };
    case CREATE_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CREATE_LIST_RESET:
      return {
        state: {},
      };
    default:
      return state;
  }
};

export const listInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case LIST_INFO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LIST_INFO_SUCCESS:
      return {
        loading: false,
        list: action.payload,
      };
    case LIST_INFO_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case LIST_INFO_RESET:
      return {};
    default:
      return state;
  }
};

export const listAddShareReducer = (state = {}, action) => {
  switch (action.type) {
    case LIST_SHARE_ADD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LIST_SHARE_ADD_SUCCESS:
      return {
        loading: false,
      };
    case LIST_SHARE_ADD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
