import {
  FRIEND_REQUESTS_REQUEST,
  FRIEND_REQUESTS_SUCCESS,
  FRIEND_REQUESTS_FAIL,
  FRIEND_REQUESTS_RESET,
  SENT_FRIEND_REQUESTS_REQUEST,
  SENT_FRIEND_REQUESTS_SUCCESS,
  SENT_FRIEND_REQUESTS_FAIL,
  SENT_FRIEND_REQUESTS_RESET,
  CREATE_FRIEND_REQUEST_SUCCESS,
  CREATE_FRIEND_REQUEST_REQUEST,
  CREATE_FRIEND_REQUEST_FAIL,
  CREATE_FRIEND_REQUEST_RESET,
  RESPOND_FRIEND_REQUEST_REQUEST,
  RESPOND_FRIEND_REQUEST_SUCCESS,
  RESPOND_FRIEND_REQUEST_FAIL,
} from "../constants/friendRequestConstants";

export const receivedFriendRequestsReducer = (state = {}, action) => {
  switch (action.type) {
    case FRIEND_REQUESTS_REQUEST:
      return {
        loading: true,
      };
    case FRIEND_REQUESTS_SUCCESS:
      return {
        loading: false,
        requests: action.payload,
      };
    case FRIEND_REQUESTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case FRIEND_REQUESTS_RESET:
      return {};
    default:
      return state;
  }
};

export const sentFriendRequestsReducer = (state = {}, action) => {
  switch (action.type) {
    case SENT_FRIEND_REQUESTS_REQUEST:
      return {
        loading: true,
      };
    case SENT_FRIEND_REQUESTS_SUCCESS:
      return {
        loading: false,
        requests: action.payload,
      };
    case SENT_FRIEND_REQUESTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case SENT_FRIEND_REQUESTS_RESET:
      return {};
    default:
      return state;
  }
};
