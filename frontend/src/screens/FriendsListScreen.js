import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserSearch from "../components/UserSearch";
import FriendElement from "../components/FriendElement";
import FriendRequest from "../components/FriendRequest";
import { getUserDetails, getFriendList } from "../actions/userActions";
import {
  getReceivedFriendRequests,
  getSentFriendRequests,
} from "../actions/friendRequestActions";
import Loader from "../components/Loader";

const FriendsListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const friendDetails = useSelector((state) => state.friendDetails);
  const { loading, error, friendList } = friendDetails;

  const searchResults = useSelector((state) => state.searchResults);
  const {
    loading: resultsLoading,
    error: resultsError,
    results,
  } = searchResults;

  const sentFriendRequests = useSelector((state) => state.sentFriendRequests);
  const { requests: sentRequests } = sentFriendRequests;

  const receivedFriendRequests = useSelector(
    (state) => state.receivedFriendRequests
  );
  const {
    loading: receivedLoading,
    requests: receivedRequests,
  } = receivedFriendRequests;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user) {
        dispatch(getUserDetails(userInfo._id));
      } else {
        if (!friendList) {
          dispatch(getFriendList(user.friends));
        }
        if (!sentRequests) {
          dispatch(getSentFriendRequests());
        }
        if (!receivedRequests) {
          dispatch(getReceivedFriendRequests());
        }
      }
    }
  }, [
    dispatch,
    userInfo,
    user,
    friendList,
    receivedRequests,
    sentRequests,
    history,
  ]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mx-auto col-md-12 col-lg-12">
          <ul className="list-group">
            <UserSearch />
            <div className="text-center">Search Results</div>
            <>
              {resultsLoading ? (
                <Loader />
              ) : (
                sentRequests &&
                results &&
                results.map((userResult) => {
                  let friendRequested = false;

                  for (let i = 0; i < sentRequests.length; i++) {
                    if (userResult._id === sentRequests[i].requestTo) {
                      friendRequested = true;
                    }
                  }

                  return (
                    <FriendElement
                      key={userResult._id}
                      friend={userResult}
                      friendRequested={friendRequested}
                    />
                  );
                })
              )}
            </>

            <div className="text-center">Friends</div>
            <>
              {loading ? (
                <Loader />
              ) : (
                friendList &&
                friendList.map((friend) => {
                  return (
                    <FriendElement
                      key={friend._id}
                      friend={friend}
                      isFriend={true}
                    />
                  );
                })
              )}
            </>

            <div className="text-center">Friend Requests</div>
            <>
              {receivedLoading ? (
                <Loader />
              ) : (
                receivedRequests &&
                receivedRequests.map((friendRequest) => {
                  return (
                    <FriendRequest
                      key={friendRequest._id}
                      friendRequest={friendRequest}
                    />
                  );
                })
              )}
            </>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FriendsListScreen;
