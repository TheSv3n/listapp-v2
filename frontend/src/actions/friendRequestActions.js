import {
  FRIEND_REQUESTS_REQUEST,
  FRIEND_REQUESTS_SUCCESS,
  FRIEND_REQUESTS_FAIL,
  SENT_FRIEND_REQUESTS_REQUEST,
  SENT_FRIEND_REQUESTS_SUCCESS,
  SENT_FRIEND_REQUESTS_FAIL,
  CREATE_FRIEND_REQUEST_SUCCESS,
  CREATE_FRIEND_REQUEST_REQUEST,
  CREATE_FRIEND_REQUEST_FAIL,
  RESPOND_FRIEND_REQUEST_REQUEST,
  RESPOND_FRIEND_REQUEST_SUCCESS,
  RESPOND_FRIEND_REQUEST_FAIL,
} from "../constants/friendRequestConstants";
import axios from "axios";

export const getReceivedFriendRequests = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: FRIEND_REQUESTS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/friendrequests/received`, config);

    dispatch({
      type: FRIEND_REQUESTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FRIEND_REQUESTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSentFriendRequests = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SENT_FRIEND_REQUESTS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/friendrequests/sent`, config);

    dispatch({
      type: SENT_FRIEND_REQUESTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SENT_FRIEND_REQUESTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createFriendRequest = (request) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_FRIEND_REQUEST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/friendrequests`, request, config);

    dispatch({
      type: CREATE_FRIEND_REQUEST_SUCCESS,
      payload: data,
    });
    dispatch(getSentFriendRequests());
  } catch (error) {
    dispatch({
      type: CREATE_FRIEND_REQUEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const friendRequestRespond = (requestId, response) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: RESPOND_FRIEND_REQUEST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/friendrequests/${requestId}/respond`,
      { response: response },
      config
    );

    dispatch({
      type: RESPOND_FRIEND_REQUEST_SUCCESS,
      payload: data,
    });
    dispatch(getReceivedFriendRequests());
  } catch (error) {
    dispatch({
      type: RESPOND_FRIEND_REQUEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
