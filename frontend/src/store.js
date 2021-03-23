import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userDetailsReducer,
  userRegisterReducer,
  friendDetailsReducer,
} from "./reducers/userReducers";
import {
  usersListsReducer,
  sharedListsReducer,
  listCreateReducer,
  listInfoReducer,
} from "./reducers/listReducers";
import {
  listItemsReducer,
  listItemCreateReducer,
} from "./reducers/listItemReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,
  userRegister: userRegisterReducer,
  usersLists: usersListsReducer,
  sharedLists: sharedListsReducer,
  listInfo: listInfoReducer,
  listCreate: listCreateReducer,
  listItems: listItemsReducer,
  listItemCreate: listItemCreateReducer,
  friendDetails: friendDetailsReducer,
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
