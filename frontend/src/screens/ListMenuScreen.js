import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ListMenuScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      //get info
    }
  }, [dispatch, history, userInfo]);
  return <div>ListMenu</div>;
};

export default ListMenuScreen;
