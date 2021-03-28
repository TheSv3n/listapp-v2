import {
  SHARE_REQUESTS_REQUEST,
  SHARE_REQUESTS_SUCCESS,
  SHARE_REQUESTS_FAIL,
  SENT_SHARE_REQUESTS_REQUEST,
  SENT_SHARE_REQUESTS_SUCCESS,
  SENT_SHARE_REQUESTS_FAIL,
  CREATE_SHARE_REQUEST_SUCCESS,
  CREATE_SHARE_REQUEST_REQUEST,
  CREATE_SHARE_REQUEST_FAIL,
  RESPOND_SHARE_REQUEST_REQUEST,
  RESPOND_SHARE_REQUEST_SUCCESS,
  RESPOND_SHARE_REQUEST_FAIL,
} from "../constants/shareRequestConstants";
import axios from "axios";

export const getReceivedShareRequests = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SHARE_REQUESTS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/sharerequests/received`, config);

    dispatch({
      type: SHARE_REQUESTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SHARE_REQUESTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSentShareRequests = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SENT_SHARE_REQUESTS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/sharerequests/sent`, config);

    dispatch({
      type: SENT_SHARE_REQUESTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SENT_SHARE_REQUESTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createShareRequest = (request) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_SHARE_REQUEST_REQUEST,
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

    const { data } = await axios.post(`/api/sharerequests`, request, config);

    dispatch({
      type: CREATE_SHARE_REQUEST_SUCCESS,
      payload: data,
    });
    dispatch(getSentShareRequests());
  } catch (error) {
    dispatch({
      type: CREATE_SHARE_REQUEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const shareRequestRespond = (requestId, response) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: RESPOND_SHARE_REQUEST_REQUEST,
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
      `/api/sharerequests/${requestId}/respond`,
      { response: response },
      config
    );

    dispatch({
      type: RESPOND_SHARE_REQUEST_SUCCESS,
      payload: data,
    });
    dispatch(getReceivedShareRequests());
  } catch (error) {
    dispatch({
      type: RESPOND_SHARE_REQUEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
