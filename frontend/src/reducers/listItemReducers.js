import {
  GET_LIST_ITEMS_REQUEST,
  GET_LIST_ITEMS_SUCCESS,
  GET_LIST_ITEMS_FAIL,
  GET_LIST_ITEMS_RESET,
  CREATE_LIST_ITEM_REQUEST,
  CREATE_LIST_ITEM_SUCCESS,
  CREATE_LIST_ITEM_FAIL,
  CREATE_LIST_ITEM_RESET,
  COMPLETE_LIST_ITEM_REQUEST,
  COMPLETE_LIST_ITEM_SUCCESS,
  COMPLETE_LIST_ITEM_FAIL,
  DELETE_LIST_ITEM_REQUEST,
  DELETE_LIST_ITEM_SUCCESS,
  DELETE_LIST_ITEM_FAIL,
} from "../constants/listItemConstants";

export const listItemsReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case GET_LIST_ITEMS_REQUEST:
      return {
        loading: true,
      };
    case GET_LIST_ITEMS_SUCCESS:
      return {
        loading: false,
        items: action.payload,
      };
    case GET_LIST_ITEMS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_LIST_ITEMS_RESET:
      return {
        lists: [],
      };
    default:
      return state;
  }
};

export const listItemCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_LIST_ITEM_REQUEST:
      return {
        loading: true,
      };
    case CREATE_LIST_ITEM_SUCCESS:
      return {
        loading: false,
        success: true,
        item: action.payload,
      };
    case CREATE_LIST_ITEM_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CREATE_LIST_ITEM_RESET:
      return {
        state: {},
      };
    default:
      return state;
  }
};

export const listItemCompleteReducer = (state = {}, action) => {
  switch (action.type) {
    case COMPLETE_LIST_ITEM_REQUEST:
      return {
        loading: true,
      };
    case COMPLETE_LIST_ITEM_SUCCESS:
      return {
        loading: false,
      };
    case COMPLETE_LIST_ITEM_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const listItemDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_LIST_ITEM_REQUEST:
      return {
        loading: true,
      };
    case DELETE_LIST_ITEM_SUCCESS:
      return {
        loading: false,
      };
    case DELETE_LIST_ITEM_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
