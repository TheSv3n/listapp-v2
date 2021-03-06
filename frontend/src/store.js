import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userDetailsReducer,
  userRegisterReducer,
  friendDetailsReducer,
  searchResultsReducer,
} from "./reducers/userReducers";
import {
  usersListsReducer,
  sharedListsReducer,
  listCreateReducer,
  listInfoReducer,
  listCompleteReducer,
  listDeleteReducer,
} from "./reducers/listReducers";
import {
  listItemsReducer,
  listItemCreateReducer,
  listItemCompleteReducer,
  listSubItemCreateReducer,
} from "./reducers/listItemReducers";
import {
  sentShareRequestsReducer,
  shareRequestCreateReducer,
  receivedShareRequestsReducer,
} from "./reducers/shareRequestReducers";
import {
  receivedFriendRequestsReducer,
  sentFriendRequestsReducer,
  friendRequestCreateReducer,
} from "./reducers/friendRequestReducers";
import {
  pageHeadingReducer,
  backButtonReducer,
  navIconsReducer,
} from "./reducers/navBarReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,
  userRegister: userRegisterReducer,
  searchResults: searchResultsReducer,
  usersLists: usersListsReducer,
  sharedLists: sharedListsReducer,
  listInfo: listInfoReducer,
  listCreate: listCreateReducer,
  listComplete: listCompleteReducer,
  listDelete: listDeleteReducer,
  listItems: listItemsReducer,
  listItemCreate: listItemCreateReducer,
  listItemComplete: listItemCompleteReducer,
  listSubItemCreate: listSubItemCreateReducer,
  friendDetails: friendDetailsReducer,
  shareRequestCreate: shareRequestCreateReducer,
  receivedShareRequests: receivedShareRequestsReducer,
  sentShareRequests: sentShareRequestsReducer,
  receivedFriendRequests: receivedFriendRequestsReducer,
  sentFriendRequests: sentFriendRequestsReducer,
  friendRequestCreate: friendRequestCreateReducer,
  pageHeading: pageHeadingReducer,
  backButton: backButtonReducer,
  navIcons: navIconsReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = { userLogin: { userInfo: userInfoFromStorage } };

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
