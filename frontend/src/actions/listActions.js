import axios from "axios";
import {
  USER_LISTS_REQUEST,
  USER_LISTS_SUCCESS,
  USER_LISTS_FAIL,
  USER_LISTS_RESET,
} from "../constants/listContstants";

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
