import {
  UPDATE_PAGE_HEADING,
  UPDATE_BACK_BUTTON,
  UPDATE_SHOW_NAV_ICONS,
} from "../constants/navBarConstants";

export const pageHeadingReducer = (state = { title: "" }, action) => {
  switch (action.type) {
    case UPDATE_PAGE_HEADING:
      let title = action.payload;

      return {
        ...state,
        title: title,
      };
    default:
      return state;
  }
};

export const backButtonReducer = (state = { showBack: false }, action) => {
  switch (action.type) {
    case UPDATE_BACK_BUTTON:
      let showBack = action.payload;

      return {
        ...state,
        showBack: showBack,
      };
    default:
      return state;
  }
};

export const navIconsReducer = (state = { showIcons: false }, action) => {
  switch (action.type) {
    case UPDATE_SHOW_NAV_ICONS:
      let showIcons = action.payload;

      return {
        ...state,
        showIcons: showIcons,
      };
    default:
      return state;
  }
};
