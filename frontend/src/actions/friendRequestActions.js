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

export const getReceivedFrienRequests = () => async (dispatch, getState) => {
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
