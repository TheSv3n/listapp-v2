import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListMenuItem from "../components/ListMenuItem";
import Loader from "../components/Loader";
import { getUsersLists } from "../actions/listActions";
import { updatePageHeading } from "../actions/navBarActions";
import { getReceivedShareRequests } from "../actions/shareRequestActions";
import { getReceivedFriendRequests } from "../actions/friendRequestActions";

const CompletedListsScreen = ({ history }) => {
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
      dispatch(getReceivedShareRequests());
      dispatch(getReceivedFriendRequests());
      dispatch(updatePageHeading(`${userInfo.userName}'s Completed Lists`));
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
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
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompletedListsScreen;
