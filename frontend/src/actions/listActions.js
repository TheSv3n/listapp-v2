import axios from "axios";
import {
  USER_LISTS_REQUEST,
  USER_LISTS_SUCCESS,
  USER_LISTS_FAIL,
  SHARED_LISTS_REQUEST,
  SHARED_LISTS_SUCCESS,
  SHARED_LISTS_FAIL,
  CREATE_LIST_REQUEST,
  CREATE_LIST_SUCCESS,
  CREATE_LIST_FAIL,
  LIST_INFO_REQUEST,
  LIST_INFO_SUCCESS,
  LIST_INFO_FAIL,
  LIST_SHARE_ADD_REQUEST,
  LIST_SHARE_ADD_SUCCESS,
  LIST_SHARE_ADD_FAIL,
  LIST_SHARE_REMOVE_REQUEST,
  LIST_SHARE_REMOVE_SUCCESS,
  LIST_SHARE_REMOVE_FAIL,
  COMPLETE_LIST_REQUEST,
  COMPLETE_LIST_SUCCESS,
  COMPLETE_LIST_FAIL,
  DELETE_LIST_REQUEST,
  DELETE_LIST_SUCCESS,
  DELETE_LIST_FAIL,
} from "../constants/listContstants";
import { updatePageHeading } from "./navBarActions";

export const getUsersLists = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LISTS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/lists/userlists`, config);

    dispatch({
      type: USER_LISTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LISTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSharedLists = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SHARED_LISTS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/lists/sharedlists`, config);

    dispatch({
      type: SHARED_LISTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SHARED_LISTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createList = (list) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_LIST_REQUEST,
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

    const { data } = await axios.post(`/api/lists`, list, config);

    dispatch({
      type: CREATE_LIST_SUCCESS,
      payload: data,
    });
    dispatch(getUsersLists());
  } catch (error) {
    dispatch({
      type: CREATE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getListInfo = (listId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LIST_INFO_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/lists/${listId}`, config);

    dispatch({
      type: LIST_INFO_SUCCESS,
      payload: data,
    });
    dispatch(updatePageHeading(data.listName));
  } catch (error) {
    dispatch({
      type: LIST_INFO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listShareAdd = (listId, userId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LIST_SHARE_ADD_REQUEST,
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
      `/api/lists/${listId}/shareadd`,
      { userId: userId },
      config
    );

    dispatch({
      type: LIST_SHARE_ADD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LIST_SHARE_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listShareRemove = (listId, friendId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: LIST_SHARE_REMOVE_REQUEST,
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
      `/api/lists/${listId}/shareremove`,
      { userId: friendId },
      config
    );

    dispatch({
      type: LIST_SHARE_REMOVE_SUCCESS,
      payload: data,
    });
    dispatch(getListInfo(listId));
    dispatch(getUsersLists());
    dispatch(getSharedLists());
  } catch (error) {
    dispatch({
      type: LIST_SHARE_REMOVE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const completeList = (listId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COMPLETE_LIST_REQUEST,
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
      `/api/lists/${listId}/finished`,
      {},
      config
    );

    dispatch({
      type: COMPLETE_LIST_SUCCESS,
      payload: data,
    });
    dispatch(getUsersLists());
  } catch (error) {
    dispatch({
      type: COMPLETE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteList = (listId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_LIST_REQUEST,
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
      `/api/lists/${listId}/deleted`,
      {},
      config
    );

    dispatch({
      type: DELETE_LIST_SUCCESS,
      payload: data,
    });
    dispatch(getUsersLists());
  } catch (error) {
    dispatch({
      type: DELETE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
