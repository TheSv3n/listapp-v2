import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getReceivedShareRequests } from "../actions/shareRequestActions";
import { getReceivedFriendRequests } from "../actions/friendRequestActions";
import { updateShowIcons } from "../actions/navBarActions";
import NavIcons from "./NavIcons";

const NavBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();

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

  const backButton = useSelector((state) => state.backButton);
  const { showBack } = backButton;

  const navIcons = useSelector((state) => state.navIcons);
  const { showIcons } = navIcons;

  const setShowIcons = () => {
    dispatch(updateShowIcons(!showIcons));
  };

  const handleBackButton = () => {
    history.goBack();
    if (showIcons) {
      dispatch(updateShowIcons(false));
    }
  };

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
      <div className="navbar-custom fixed-top">
        <div className="container mt-3">
          <div className="row mx-4">
            <div className="mr-auto  title-text">
              {showBack ? (
                <span
                  className="nav-icon-span"
                  onClick={() => handleBackButton()}
                >
                  <i className="far fa-arrow-alt-circle-left nav-item-icon" />
                </span>
              ) : (
                ""
              )}
            </div>

            <div className="mx-auto title-text my-auto page-heading">
              {title}
            </div>
            <div className="ml-auto title-text">
              <div className="d-none d-lg-block d-md-block">
                <NavIcons />
              </div>
              <div className="d-block d-lg-none d-md-none">
                {(friendRequests && friendRequests.length > 0) ||
                (shareRequests && shareRequests.length > 0) ? (
                  <i
                    className="fas fa-bars icon-has-message nav-item-icon"
                    onClick={() => {
                      setShowIcons();
                    }}
                  ></i>
                ) : (
                  <i
                    className="fas fa-bars"
                    onClick={() => {
                      setShowIcons();
                    }}
                  ></i>
                )}
              </div>
            </div>
          </div>
        </div>
        {showIcons ? (
          <div className="navbar-custom icon-bar">
            <ul className="navbar-nav align-items-center mx-auto d-md-none d-lg-none">
              <li className="nav-item-icon mx-auto nav-link">
                <NavIcons />
              </li>
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default NavBar;
