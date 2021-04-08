import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NavIcons = () => {
  const receivedShareRequests = useSelector(
    (state) => state.receivedShareRequests
  );
  const { requests: shareRequests } = receivedShareRequests;

  const receivedFriendRequests = useSelector(
    (state) => state.receivedFriendRequests
  );
  const { requests: friendRequests } = receivedFriendRequests;
  return (
    <>
      <Link to="/friendlist" style={{ textDecoration: "none" }}>
        {friendRequests && friendRequests.length > 0 ? (
          <i className="fas fa-user-friends nav-item-icon mr-2 icon-has-message" />
        ) : (
          <i className="fas fa-user-friends nav-item-icon mr-2" />
        )}
      </Link>
      <Link to="/messagecentre" style={{ textDecoration: "none" }}>
        {shareRequests && shareRequests.length > 0 ? (
          <i className="fas fa-envelope nav-item-icon mr-2 icon-has-message" />
        ) : (
          <i className="fas fa-envelope nav-item-icon mr-2" />
        )}
      </Link>
      <Link to="/profile" style={{ textDecoration: "none" }}>
        <i className="fas fa-cog nav-item-icon" />
      </Link>
    </>
  );
};

export default NavIcons;
