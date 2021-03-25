import {
  GET_SHARE_REQUESTS_REQUEST,
  GET_SHARE_REQUESTS_SUCCESS,
  GET_SHARE_REQUESTS_FAIL,
  GET_SENT_SHARE_REQUESTS_REQUEST,
  GET_SENT_SHARE_REQUESTS_SUCCESS,
  GET_SENT_SHARE_REQUESTS_FAIL,
  CREATE_SHARE_REQUEST_SUCCESS,
  CREATE_SHARE_REQUEST_REQUEST,
  CREATE_SHARE_REQUEST_FAIL,
  CREATE_SHARE_REQUEST_RESET,
} from "../constants/shareRequestConstants";

export const receivedShareRequestsReducer = (
  state = { requests: [] },
  action
) => {
  switch (action.type) {
    case GET_SHARE_REQUESTS_REQUEST:
      return {
        loading: true,
      };
    case GET_SHARE_REQUESTS_SUCCESS:
      return {
        loading: false,
        requests: action.payload,
      };
    case GET_SHARE_REQUESTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const sentShareRequestsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SENT_SHARE_REQUESTS_REQUEST:
      return {
        loading: true,
      };
    case GET_SENT_SHARE_REQUESTS_SUCCESS:
      return {
        loading: false,
        requests: action.payload,
      };
    case GET_SENT_SHARE_REQUESTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

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
