import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListMenuItem from "../components/ListMenuItem";
import ListEditor from "../components/ListEditor";
import { getUsersLists } from "../actions/listActions";

const ListMenuScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const usersLists = useSelector((state) => state.usersLists);
  const { loading, error, lists } = usersLists;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(getUsersLists());
    }
  }, [dispatch, history, userInfo]);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 mx-auto col-md-12 col-lg-12">
            <ul className="list-group">
              <ListEditor />
              <div className="text-center">My Lists</div>
              {lists &&
                lists.map((list) => {
                  if (
                    list.listFinished === false &&
                    list.listDeleted === false
                  ) {
                    return <ListMenuItem key={list._id} list={list} />;
                  } else {
                    return <div key={list._id} />;
                  }
                })}
              <div className="text-center">Friends' Lists</div>
              {/*(value) => {
                  return value.sharedLists.map((list) => {
                    if (
                      list.listFinished === false &&
                      list.listDeleted === false
                    ) {
                      return (
                        <ListMenuItem
                          key={list._id}
                          list={list}
                          user={value.user}
                        />
                      );
                    } else {
                      return <div key={list._id} />;
                    }
                  });
                */}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListMenuScreen;
