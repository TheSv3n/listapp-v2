import React from "react";
import { Link } from "react-router-dom";
import { createShareRequest } from "../actions/shareRequestActions";
import { useDispatch, useSelector } from "react-redux";

const ListFriendElement = ({ friend, isOwner, isShared, isRequested }) => {
  const dispatch = useDispatch();

  const listInfo = useSelector((state) => state.listInfo);
  const { list } = listInfo;

  const handleShareRemove = () => {
    //remove share
  };

  const handleShareRequest = () => {
    dispatch(
      createShareRequest({
        requestTo: friend._id,
        listId: list._id,
        listName: list.listName,
      })
    );
  };

  const handleNewMessage = () => {
    //send message (originally took (id, userName))
  };

  return (
    <div className="container-fluid text-center ">
      <div className="row">
        <div className="mr-auto dark-text col-2">{friend.userName}</div>
        <span className="ml-auto col-6 friend-icon-span">
          {isOwner ? (
            <span className="icon-span text-danger col-1 mx-auto col-lg-1" />
          ) : (
            [
              isShared ? (
                <span
                  className="icon-span text-danger col-1 mr-auto col-lg-1"
                  onClick={() => {
                    handleShareRemove();
                  }}
                >
                  <i className="fas fa-minus-circle icon" />
                </span>
              ) : isRequested ? (
                <span className="icon-span col-1 mr-auto col-lg-1 hidden-icon">
                  <i className="fas fa-plus-circle" />
                </span>
              ) : (
                <span
                  className="icon-span text-success col-1 mr-auto col-lg-1"
                  onClick={() => {
                    handleShareRequest();
                  }}
                >
                  <i className="fas fa-plus-circle icon" />
                </span>
              ),
            ]
          )}
          <Link to="/conversation">
            <span
              className="icon-span text-primary col-1 mr-auto col-lg-1"
              onClick={() => {
                handleNewMessage();
              }}
            >
              <i className="fas fa-envelope icon" />
            </span>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default ListFriendElement;
