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
  LIST_ITEMS_UPDATE,
  CREATE_LIST_SUB_ITEM_REQUEST,
  CREATE_LIST_SUB_ITEM_SUCCESS,
  CREATE_LIST_SUB_ITEM_FAIL,
  COMPLETE_LIST_SUB_ITEM_REQUEST,
  COMPLETE_LIST_SUB_ITEM_SUCCESS,
  COMPLETE_LIST_SUB_ITEM_FAIL,
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

    console.log(listItem);

    const { data } = await axios.post(`/api/listitems`, listItem, config);

    dispatch({
      type: CREATE_LIST_ITEM_SUCCESS,
      payload: data,
    });
    dispatch(addToListItems(data));
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

export const completeListItem = (itemId) => async (dispatch, getState) => {
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
    dispatch(updateListItems(data));
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

export const deleteListItem = (itemId) => async (dispatch, getState) => {
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
    dispatch(updateListItems(data));
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

export const updateListItems = (listItem) => async (dispatch, getState) => {
  const {
    listItems: { items },
  } = getState();
  let tempItems = [...items];

  let index = tempItems.findIndex((item) => {
    return item._id === listItem._id;
  });
  tempItems[index] = listItem;

  dispatch({
    type: LIST_ITEMS_UPDATE,
    payload: tempItems,
  });
};

export const addToListItems = (listItem) => async (dispatch, getState) => {
  const {
    listItems: { items },
  } = getState();
  let tempItems = [...items, listItem];

  dispatch({
    type: LIST_ITEMS_UPDATE,
    payload: tempItems,
  });
};

export const createSubItem =
  (listItemId, subItem) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_LIST_SUB_ITEM_REQUEST,
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
        `/api/listitems/${listItemId}/subitems`,
        subItem,
        config
      );

      dispatch({
        type: CREATE_LIST_SUB_ITEM_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_LIST_SUB_ITEM_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const completeListSubItem =
  (itemId, subItemId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: COMPLETE_LIST_SUB_ITEM_REQUEST,
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
        `/api/listitems/${itemId}/subitems/completed`,
        { subItemId: subItemId },
        config
      );

      dispatch({
        type: COMPLETE_LIST_SUB_ITEM_SUCCESS,
        payload: data,
      });
      dispatch(updateListItems(data));
    } catch (error) {
      dispatch({
        type: COMPLETE_LIST_SUB_ITEM_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
