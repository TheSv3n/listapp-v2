import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getReceivedShareRequests } from "../actions/shareRequestActions";

const NavBar = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const receivedShareRequests = useSelector(
    (state) => state.receivedShareRequests
  );
  const { requests } = receivedShareRequests;

  useEffect(() => {
    /*if (userInfo && !requests) {
      dispatch(getReceivedShareRequests());
    }*/
  }, [dispatch, userInfo, requests]);

  return (
    <div className="navbar">
      <div className="mr-auto ml-4 title-text">
        <Link to="/" style={{ textDecoration: "none" }}>
          <i className="far fa-arrow-alt-circle-left nav-item-icon" />
        </Link>
      </div>
      <div className="mx-auto title-text">ListApp v2</div>
      <div className="ml-auto mr-4 title-text">
        <Link to="/friendlist" style={{ textDecoration: "none" }}>
          <i className="fas fa-user-friends nav-item-icon mr-2" />
        </Link>
        <Link to="/messagecentre" style={{ textDecoration: "none" }}>
          {requests && requests.length > 0 ? (
            <i className="fas fa-envelope nav-item-icon mr-2 icon-has-message" />
          ) : (
            <i className="fas fa-envelope nav-item-icon mr-2" />
          )}
        </Link>
        <Link to="/profile" style={{ textDecoration: "none" }}>
          <i className="fas fa-cog nav-item-icon" />
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
