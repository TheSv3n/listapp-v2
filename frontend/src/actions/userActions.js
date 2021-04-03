import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_LOGOUT,
  USER_DETAILS_RESET,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_RESET,
  USER_FRIENDLIST_REQUEST,
  USER_FRIENDLIST_SUCCESS,
  USER_FRIENDLIST_FAIL,
  USER_FRIENDLIST_RESET,
  USER_SEARCH_REQUEST,
  USER_SEARCH_SUCCESS,
  USER_SEARCH_FAIL,
  USER_FRIEND_ADD_REQUEST,
  USER_FRIEND_ADD_SUCCESS,
  USER_FRIEND_ADD_FAIL,
} from "../constants/userConstants";
import {
  USER_LISTS_RESET,
  SHARED_LISTS_RESET,
  LIST_INFO_RESET,
} from "../constants/listContstants";
import { LIST_ITEMS_RESET } from "../constants/listItemConstants";
import {
  SHARE_REQUESTS_RESET,
  SENT_SHARE_REQUESTS_RESET,
} from "../constants/shareRequestConstants";

export const login = (userName, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login",
      { userName, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: USER_REGISTER_RESET });
  dispatch({ type: USER_FRIENDLIST_RESET });
  dispatch({ type: SHARED_LISTS_RESET });
  dispatch({ type: USER_LISTS_RESET });
  dispatch({ type: LIST_ITEMS_RESET });
  dispatch({ type: LIST_INFO_RESET });
  dispatch({ type: SENT_SHARE_REQUESTS_RESET });
  dispatch({ type: SHARE_REQUESTS_RESET });
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
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

    const { data } = await axios.get(`/api/users/${id}`, config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const registerUser = (
  userName,
  firstName,
  lastName,
  email,
  password
) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users",
      { userName, firstName, lastName, email, password },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getFriendList = (friendList) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_FRIENDLIST_REQUEST,
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

    const { data } = await axios.post(
      `/api/users/friendlist`,
      { friendList: friendList },
      config
    );

    dispatch({
      type: USER_FRIENDLIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_FRIENDLIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const searchUsers = (searchString) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_SEARCH_REQUEST,
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

    const { data } = await axios.get(
      `/api/users/search?searchString=${searchString}`,
      config
    );

    dispatch({
      type: USER_SEARCH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_SEARCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userFriendAdd = (userId, friendId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: USER_FRIEND_ADD_REQUEST,
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
      `/api/users/${userId}/friendadd`,
      { friendId: friendId },
      config
    );

    dispatch({
      type: USER_FRIEND_ADD_SUCCESS,
      payload: data,
    });
    console.log(userId, userInfo._id);
    if (userId === userInfo._id) {
      dispatch(getUserDetails(userId));
      const {
        userDetails: { user },
      } = getState();

      dispatch(getFriendList(user.friends));
    }
  } catch (error) {
    dispatch({
      type: USER_FRIEND_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
