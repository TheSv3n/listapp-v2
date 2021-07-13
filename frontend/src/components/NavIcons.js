import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateShowIcons } from "../actions/navBarActions";

const NavIcons = () => {
  const dispatch = useDispatch();
  const receivedShareRequests = useSelector(
    (state) => state.receivedShareRequests
  );
  const { requests: shareRequests } = receivedShareRequests;

  const receivedFriendRequests = useSelector(
    (state) => state.receivedFriendRequests
  );
  const { requests: friendRequests } = receivedFriendRequests;

  const navIcons = useSelector((state) => state.navIcons);
  const { showIcons } = navIcons;

  const hideIcons = () => {
    if (showIcons) {
      dispatch(updateShowIcons(false));
    }
  };

  return (
    <>
      <Link
        to="/"
        style={{ textDecoration: "none" }}
        onClick={() => hideIcons()}
      >
        <i className="fas fa-list-alt nav-item-icon mr-2" />
      </Link>
      <Link
        to="/friendlist"
        style={{ textDecoration: "none" }}
        onClick={() => hideIcons()}
      >
        {friendRequests && friendRequests.length > 0 ? (
          <i className="fas fa-user-friends nav-item-icon mr-2 icon-has-message" />
        ) : (
          <i className="fas fa-user-friends nav-item-icon mr-2" />
        )}
      </Link>
      <Link
        to="/messagecentre"
        style={{ textDecoration: "none" }}
        onClick={() => hideIcons()}
      >
        {shareRequests && shareRequests.length > 0 ? (
          <i className="fas fa-envelope nav-item-icon mr-2 icon-has-message" />
        ) : (
          <i className="fas fa-envelope nav-item-icon mr-2" />
        )}
      </Link>
      <Link
        to="/profile"
        style={{ textDecoration: "none" }}
        onClick={() => hideIcons()}
      >
        <i className="fas fa-cog nav-item-icon" />
      </Link>
    </>
  );
};

export default NavIcons;
