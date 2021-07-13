import {
  UPDATE_PAGE_HEADING,
  UPDATE_BACK_BUTTON,
  UPDATE_SHOW_NAV_ICONS,
} from "../constants/navBarConstants";

export const updatePageHeading = (newTitle) => (dispatch) => {
  dispatch({
    type: UPDATE_PAGE_HEADING,
    payload: newTitle,
  });
};

export const updateBackButton = (showBack) => (dispatch) => {
  dispatch({
    type: UPDATE_BACK_BUTTON,
    payload: showBack,
  });
};

export const updateShowIcons = (showIcons) => (dispatch) => {
  dispatch({
    type: UPDATE_SHOW_NAV_ICONS,
    payload: showIcons,
  });
};
