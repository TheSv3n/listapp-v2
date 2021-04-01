import React, { useState } from "react";
import { searchUsers } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const UserSearch = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    if (userName.length > 0) {
      dispatch(searchUsers(userName));
    }
  };
  return (
    <>
      <li className="list-group-item text-capitalize my-2">
        <form onSubmit={handleSubmitSearch}>
          <div className="row">
            <div className="input-group col-6  my-1">
              <div className="input-group-prepend">
                <div className="input-group-text bg-primary text-white">
                  <i className="fas fa-user" />
                </div>
              </div>
              <input
                type="text"
                className="form-control text-capitalize"
                placeholder="Enter Username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="input-group col-6 my-1">
              <button type="submit" className="btn btn-block btn-primary mx-3">
                Search Users
              </button>
            </div>
          </div>
        </form>
      </li>
    </>
  );
};

export default UserSearch;
