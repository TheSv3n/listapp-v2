import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserSearch from "../components/UserSearch";
import FriendElement from "../components/FriendElement";
import { getUserDetails, getFriendList } from "../actions/userActions";
import Loader from "../components/Loader";

const FriendsListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const friendDetails = useSelector((state) => state.friendDetails);
  const { loading, error, friendList } = friendDetails;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user) {
        dispatch(getUserDetails(userInfo._id));
      } else if (!friendList) {
        dispatch(getFriendList(user.friends));
      }
    }
  }, [dispatch, userInfo, user, friendList, history]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mx-auto col-md-12 col-lg-12">
          <ul className="list-group">
            <UserSearch />
            <div className="text-center">Search Results</div>
            <>
              {/*(value) => {
                return value.friendSearchResults.map((user) => {
                  let friendRequested = "false";

                  for (let i = 0; i < value.sentFriendRequests.length; i++) {
                    if (user._id === value.sentFriendRequests[i].requestTo) {
                      friendRequested = "true";
                    }
                  }

                  return (
                    <FriendElement
                      key={user._id}
                      friend={user}
                      inFriends="false"
                      friendsList={value.friendsList}
                      friendRequested={friendRequested}
                      user={value.user}
                    />
                  );
                });
              }*/}
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
                      inFriends={true}
                    />
                  );
                })
              )}
            </>

            <div className="text-center">Friend Requests</div>
            <>
              {/*(value) => {
                return value.friendRequests.map((friendRequest) => {
                  return (
                    <FriendRequest
                      key={friendRequest._id}
                      friendRequest={friendRequest}
                    />
                  );
                });
              }*/}
            </>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FriendsListScreen;
