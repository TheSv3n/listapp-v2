import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListMenuItem from "../components/ListMenuItem";
import ListEditor from "../components/ListEditor";
import Loader from "../components/Loader";
import { getUsersLists, getSharedLists } from "../actions/listActions";
import { getReceivedShareRequests } from "../actions/shareRequestActions";
import { getReceivedFriendRequests } from "../actions/friendRequestActions";
import {
  updatePageHeading,
  updateBackButton,
  updateShowIcons,
} from "../actions/navBarActions";
import { Link } from "react-router-dom";
import Meta from "../components/Meta";

const ListMenuScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const usersLists = useSelector((state) => state.usersLists);
  const { loading, lists } = usersLists;

  const sharedLists = useSelector((state) => state.sharedLists);
  const { loading: loadingShared, sharedLists: usersSharedLists } = sharedLists;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(getUsersLists());
      dispatch(getSharedLists());
      dispatch(getReceivedShareRequests());
      dispatch(getReceivedFriendRequests());
      dispatch(updatePageHeading(`${userInfo.userName}'s Lists`));
      dispatch(updateBackButton(false));
    }
  }, [dispatch, history, userInfo]);

  const navIcons = useSelector((state) => state.navIcons);
  const { showIcons } = navIcons;

  const hideIcons = () => {
    if (showIcons) {
      dispatch(updateShowIcons(false));
    }
  };
  return (
    <>
      {userInfo && <Meta title={`${userInfo.userName}'s Lists - ListApp`} />}
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
                  <Link
                    to="/completedlists"
                    style={{ textDecoration: "none" }}
                    onClick={() => hideIcons()}
                  >
                    <button className="btn btn-block btn-primary col-5 mx-auto mt-1">
                      View Completed Lists
                    </button>
                  </Link>
                </>
              )}
              {loadingShared ? (
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
