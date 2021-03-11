import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="mr-auto ml-4 title-text">
        <Link to="/" style={{ textDecoration: "none" }}>
          <i className="far fa-arrow-alt-circle-left nav-item-icon" />
        </Link>
      </div>
      <div className="mx-auto title-text">ListApp v2</div>
      <div className="ml-auto mr-4 title-text">
        <Link to="/friendsList" style={{ textDecoration: "none" }}>
          <i className="fas fa-user-friends nav-item-icon mr-2" />
        </Link>
        <Link to="/messageCentre" style={{ textDecoration: "none" }}>
          <i className="fas fa-envelope nav-item-icon mr-2" />
        </Link>
        <Link to="/userOptions" style={{ textDecoration: "none" }}>
          <i className="fas fa-cog nav-item-icon" />
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
