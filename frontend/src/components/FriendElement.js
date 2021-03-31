import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const FriendElement = ({ friend, isFriend, isUser, friendRequested }) => {
  let resultFriend = false;
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  for (var i = 0; i < user.friends.length; i++) {
    if (friend._id === user.friends[i]._id || friend._id === user._id) {
      resultFriend = true;
    }
  }

  const handleRemoveFriend = () => {
    //TODO
  };

  const handleFriendRequest = () => {
    //TODO
  };

  const handleNewMessage = () => {
    //TODO
  };
  return (
    <li className="list-group-item text-capitalize d-flex text-center my-2">
      <div className="container-fluid text-center ">
        <div className="row">
          <div className="col-3 mx-auto col-lg-3">{friend.userName}</div>
          <div className="col-3 mx-auto col-lg-3">{friend.name}</div>
          <div className="mx-auto">
            <div className="input-group">
              {isFriend ? (
                <span
                  className="icon-span text-danger col-1 mx-auto col-lg-1"
                  onClick={() => {
                    handleRemoveFriend();
                  }}
                >
                  <i className="fas fa-user-alt-slash icon" />
                </span>
              ) : (
                [
                  resultFriend ? (
                    <span className="icon-span text-success col-1 mx-auto col-lg-1" />
                  ) : friendRequested ? (
                    <span className="icon-span col-1 mx-auto col-lg-1 hidden-icon">
                      <i className="fas fa-user-plus" />
                    </span>
                  ) : (
                    <span
                      className="icon-span text-success col-1 mx-auto col-lg-1"
                      onClick={() => {
                        handleFriendRequest();
                      }}
                    >
                      <i className="fas fa-user-plus icon" />
                    </span>
                  ),
                ]
              )}
              {isUser ? (
                <span className="icon-span text-success col-1 mx-auto col-lg-1" />
              ) : (
                <Link to="/conversation">
                  <span
                    className="icon-span text-primary col-1 mx-auto col-lg-1"
                    onClick={() => {
                      handleNewMessage();
                    }}
                  >
                    <i className="fas fa-envelope icon" />
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default FriendElement;
