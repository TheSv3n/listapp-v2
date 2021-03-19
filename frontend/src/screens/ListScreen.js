import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListInfo } from "../actions/listActions";
import { getListItems } from "../actions/listItemActions";

const ListScreen = ({ match, history }) => {
  const listId = match.params.id;
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const listInfo = useSelector((state) => state.listInfo);
  const { list } = listInfo;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(getListInfo(listId));
      dispatch(getListItems(listId));
    }
  }, [dispatch, history, userInfo, listId]);
  return <div>ListScreen</div>;
};

export default ListScreen;
