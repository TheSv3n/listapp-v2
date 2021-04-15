import React from "react";
import { useDispatch } from "react-redux";
import { friendRequestRespond } from "../actions/friendRequestActions";
import { userFriendAdd } from "../actions/userActions";

const FriendRequest = ({ friendRequest }) => {
  const dispatch = useDispatch();

  const handleFriendResponse = (response) => {
    dispatch(friendRequestRespond(friendRequest._id, response));
    if (response === 1) {
      dispatch(
        userFriendAdd(friendRequest.requestTo, friendRequest.requestFrom)
      );
      dispatch(
        userFriendAdd(friendRequest.requestFrom, friendRequest.requestTo)
      );
    }
  };

  const handleNewMessage = () => {
    //TODO (message)
  };
  return (
    <li className="list-group-item text-capitalize d-flex text-center my-2">
      <div className="container-fluid text-center ">
        <div className="row">
          <div className="col-3 mx-auto col-lg-3">{friendRequest.fromName}</div>
          <div className="col-3 mx-auto col-lg-3">{friendRequest.fromName}</div>
          <div className="mx-auto">
            <div className="input-group">
              <span
                className="icon-span text-success col-1 mx-auto col-lg-1"
                onClick={() => {
                  handleFriendResponse(1);
                }}
              >
                <i className="fas fa-user-plus icon" />
              </span>
              <span
                className="icon-span text-danger col-1 mx-auto col-lg-1"
                onClick={() => {
                  handleFriendResponse(2);
                }}
              >
                <i className="fas fa-user-slash icon" />
              </span>
              <span
                className="icon-span text-primary col-1 mx-auto col-lg-1"
                onClick={() => {
                  handleNewMessage();
                }}
              >
                <i className="fas fa-envelope icon" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default FriendRequest;
