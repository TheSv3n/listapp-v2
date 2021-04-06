import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListMenuItem from "../components/ListMenuItem";
import ListEditor from "../components/ListEditor";
import Loader from "../components/Loader";
import { getUsersLists, getSharedLists } from "../actions/listActions";
import { getReceivedShareRequests } from "../actions/shareRequestActions";
import { getReceivedFriendRequests } from "../actions/friendRequestActions";
import { updatePageHeading } from "../actions/navBarActions";

const ListMenuScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const usersLists = useSelector((state) => state.usersLists);
  const { loading, error, lists } = usersLists;

  const sharedLists = useSelector((state) => state.sharedLists);
  const {
    loading: loadingShared,
    error: errorShared,
    sharedLists: usersSharedLists,
  } = sharedLists;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(getUsersLists());
      dispatch(getSharedLists());
      dispatch(getReceivedShareRequests());
      dispatch(getReceivedFriendRequests());
      dispatch(updatePageHeading(`${userInfo.userName}'s Lists`));
    }
  }, [dispatch, history, userInfo]);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 mx-auto col-md-12 col-lg-12">
            <ul className="list-group">
              <ListEditor />
              {loading ? (
                <Loader />
              ) : (
                <>
                  <div className="text-center">My Lists</div>
                  <>
                    {lists &&
                      lists.map((list) => {
                        if (
                          list.listFinished === false &&
                          list.listDeleted === false
                        ) {
                          return (
                            <ListMenuItem
                              key={list._id}
                              list={list}
                              history={history}
                            />
                          );
                        } else {
                          return <div key={list._id} />;
                        }
                      })}
                  </>{" "}
                </>
              )}
              {loading ? (
                <Loader />
              ) : (
                <>
                  <div className="text-center">Friends' Lists</div>
                  <>
                    {usersSharedLists &&
                      usersSharedLists.map((list) => {
                        if (
                          list.listFinished === false &&
                          list.listDeleted === false
                        ) {
                          return (
                            <ListMenuItem
                              key={list._id}
                              list={list}
                              history={history}
                            />
                          );
                        } else {
                          return <div key={list._id} />;
                        }
                      })}
                  </>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListMenuScreen;
