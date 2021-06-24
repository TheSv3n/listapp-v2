import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getReceivedShareRequests } from "../actions/shareRequestActions";
import { getReceivedFriendRequests } from "../actions/friendRequestActions";
import NavIcons from "./NavIcons";

const NavBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [showIcons, setShowIcons] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const receivedShareRequests = useSelector(
    (state) => state.receivedShareRequests
  );
  const { requests: shareRequests } = receivedShareRequests;

  const receivedFriendRequests = useSelector(
    (state) => state.receivedFriendRequests
  );
  const { requests: friendRequests } = receivedFriendRequests;

  const pageHeading = useSelector((state) => state.pageHeading);
  const { title } = pageHeading;

  useEffect(() => {
    if (userInfo) {
      if (!shareRequests) {
        dispatch(getReceivedShareRequests());
      }
      if (!friendRequests) {
        dispatch(getReceivedFriendRequests());
      }
    }
  }, [dispatch, userInfo, shareRequests, friendRequests]);

  return (
    <>
      <div className="navbar fixed-top">
        <div className="mr-auto ml-4 title-text">
          <span className="nav-icon-span" onClick={history.goBack}>
            <i className="far fa-arrow-alt-circle-left nav-item-icon" />
          </span>
        </div>
        <div className="mx-auto title-text">{title}</div>
        <div className="ml-auto mr-4 title-text">
          <div className="d-none d-lg-block d-md-block">
            <NavIcons />
          </div>
          <div className="d-block d-lg-none d-md-none">
            {(friendRequests && friendRequests.length > 0) ||
            (shareRequests && shareRequests.length > 0) ? (
              <i
                className="fas fa-bars icon-has-message nav-item-icon"
                onClick={() => {
                  setShowIcons(!showIcons);
                }}
              ></i>
            ) : (
              <i
                className="fas fa-bars"
                onClick={() => {
                  setShowIcons(!showIcons);
                }}
              ></i>
            )}
          </div>
        </div>
      </div>
      {showIcons ? (
        <div className="navbar">
          <ul className="navbar-nav align-items-center mx-auto d-md-none d-lg-none">
            <li className="nav-item-icon mx-auto nav-link">
              <NavIcons />
            </li>
          </ul>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default NavBar;
