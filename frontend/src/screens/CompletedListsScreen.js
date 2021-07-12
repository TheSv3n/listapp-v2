import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListMenuItem from "../components/ListMenuItem";
import Loader from "../components/Loader";
import { getUsersLists } from "../actions/listActions";
import { updatePageHeading, updateBackButton } from "../actions/navBarActions";
import { getReceivedShareRequests } from "../actions/shareRequestActions";
import { getReceivedFriendRequests } from "../actions/friendRequestActions";
import Meta from "../components/Meta";

const CompletedListsScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const usersLists = useSelector((state) => state.usersLists);
  const { loading, lists } = usersLists;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(getUsersLists());
      dispatch(getReceivedShareRequests());
      dispatch(getReceivedFriendRequests());
      dispatch(updatePageHeading(`${userInfo.userName}'s Completed Lists`));
      dispatch(updateBackButton(true));
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      {userInfo && (
        <Meta title={`${userInfo.userName}'s Completed Lists - ListApp`} />
      )}
      <div className="container">
        <div className="row">
          <div className="col-12 mx-auto col-md-12 col-lg-12">
            <ul className="list-group">
              {loading ? (
                <Loader />
              ) : (
                <>
                  <div className="text-center">Finished Lists</div>
                  <>
                    {lists &&
                      lists.map((list) => {
                        if (
                          list.listFinished === true &&
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
                  <div className="text-center">
                    Deleted Lists - Will be permanently deleted after 30 days
                  </div>
                  <>
                    {lists &&
                      lists.map((list) => {
                        if (list.listDeleted === true) {
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
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompletedListsScreen;
