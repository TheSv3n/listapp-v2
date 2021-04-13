import {
  LIST_ITEMS_REQUEST,
  LIST_ITEMS_SUCCESS,
  LIST_ITEMS_FAIL,
  CREATE_LIST_ITEM_REQUEST,
  CREATE_LIST_ITEM_SUCCESS,
  CREATE_LIST_ITEM_FAIL,
  COMPLETE_LIST_ITEM_REQUEST,
  COMPLETE_LIST_ITEM_SUCCESS,
  COMPLETE_LIST_ITEM_FAIL,
  DELETE_LIST_ITEM_REQUEST,
  DELETE_LIST_ITEM_SUCCESS,
  DELETE_LIST_ITEM_FAIL,
} from "../constants/listItemConstants";
import axios from "axios";

export const getListItems = (listId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LIST_ITEMS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/listitems/${listId}`, config);

    dispatch({
      type: LIST_ITEMS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LIST_ITEMS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createListItem = (listItem) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_LIST_ITEM_REQUEST,
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

    const { data } = await axios.post(`/api/listitems`, listItem, config);

    dispatch({
      type: CREATE_LIST_ITEM_SUCCESS,
      payload: data,
    });
    dispatch(getListItems(listItem.list));
  } catch (error) {
    dispatch({
      type: CREATE_LIST_ITEM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const completeListItem = (itemId, listId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: COMPLETE_LIST_ITEM_REQUEST,
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
      `/api/listitems/${itemId}/completed`,
      {},
      config
    );

    dispatch({
      type: COMPLETE_LIST_ITEM_SUCCESS,
      payload: data,
    });
    dispatch(getListItems(listId));
    //dispatch(updateListItems(data));
  } catch (error) {
    dispatch({
      type: COMPLETE_LIST_ITEM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteListItem = (itemId, listId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: DELETE_LIST_ITEM_REQUEST,
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
      `/api/listitems/${itemId}/deleted`,
      {},
      config
    );

    dispatch({
      type: DELETE_LIST_ITEM_SUCCESS,
      payload: data,
    });
    dispatch(getListItems(listId));
  } catch (error) {
    dispatch({
      type: DELETE_LIST_ITEM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateListItems = (listItem) => async (dispatch, getState) => {};
