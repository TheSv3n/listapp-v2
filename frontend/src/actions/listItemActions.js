import {
  GET_LIST_ITEMS_REQUEST,
  GET_LIST_ITEMS_SUCCESS,
  GET_LIST_ITEMS_FAIL,
  GET_LIST_ITEMS_RESET,
  CREATE_LIST_ITEM_REQUEST,
  CREATE_LIST_ITEM_SUCCESS,
  CREATE_LIST_ITEM_FAIL,
  CREATE_LIST_ITEM_RESET,
} from "../constants/listItemConstants";
import axios from "axios";

export const getListItems = (listId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_LIST_ITEMS_REQUEST,
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
      type: GET_LIST_ITEMS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_LIST_ITEMS_FAIL,
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
    dispatch(getListItems());
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
