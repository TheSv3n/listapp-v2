import {
  SHARE_REQUESTS_REQUEST,
  SHARE_REQUESTS_SUCCESS,
  SHARE_REQUESTS_FAIL,
  SHARE_REQUESTS_RESET,
  SENT_SHARE_REQUESTS_REQUEST,
  SENT_SHARE_REQUESTS_SUCCESS,
  SENT_SHARE_REQUESTS_FAIL,
  SENT_SHARE_REQUESTS_RESET,
  CREATE_SHARE_REQUEST_SUCCESS,
  CREATE_SHARE_REQUEST_REQUEST,
  CREATE_SHARE_REQUEST_FAIL,
  CREATE_SHARE_REQUEST_RESET,
} from "../constants/shareRequestConstants";

export const receivedShareRequestsReducer = (state = {}, action) => {
  switch (action.type) {
    case SHARE_REQUESTS_REQUEST:
      return {
        loading: true,
      };
    case SHARE_REQUESTS_SUCCESS:
      return {
        loading: false,
        requests: action.payload,
      };
    case SHARE_REQUESTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case SHARE_REQUESTS_RESET:
      return {};
    default:
      return state;
  }
};

export const sentShareRequestsReducer = (state = {}, action) => {
  switch (action.type) {
    case SENT_SHARE_REQUESTS_REQUEST:
      return {
        loading: true,
      };
    case SENT_SHARE_REQUESTS_SUCCESS:
      return {
        loading: false,
        requests: action.payload,
      };
    case SENT_SHARE_REQUESTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case SENT_SHARE_REQUESTS_RESET:
      return {};
    default:
      return state;
  }
};

export const shareRequestCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_SHARE_REQUEST_REQUEST:
      return {
        loading: true,
      };
    case CREATE_SHARE_REQUEST_SUCCESS:
      return {
        loading: false,
        success: true,
        list: action.payload,
      };
    case CREATE_SHARE_REQUEST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CREATE_SHARE_REQUEST_RESET:
      return {
        state: {},
      };
    default:
      return state;
  }
};
