import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ListMenuItem = ({ list, history }) => {
  const [blocked, setBlocked] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const clickHandler = () => {
    history.push(`/list/${list._id}`);
  };

  const handleListChecked = () => {
    //TODO
  };

  const handleRemoveShare = () => {
    //TODO
  };

  const handleDelete = () => {
    //TODO
  };

  return (
    <div className="container d-inline">
      <div className="row">
        <li
          className={
            list.listFinished
              ? "list-group-item list-group-item-done list-menu-item d-flex text-center my-1 my-md-2 my-lg-2"
              : "list-group-item list-menu-item d-flex text-center my-1 my-md-2 my-lg-2 col-10"
          }
          onClick={() => {
            clickHandler();
          }}
        >
          <div className="container-fluid text-center ">
            <div className="row">
              <div className="mr-auto dark-text ">{list.listName}</div>
              <div className="ml-auto"></div>
            </div>
          </div>
        </li>
        {userInfo._id === list.owner ? (
          <>
            <span
              className="icon-span col-1 mx-auto col-lg-1"
              onClick={() => {
                handleListChecked();
              }}
            >
              <i
                className={
                  list.listFinished
                    ? "text-danger fas fa-undo-alt icon"
                    : "text-success fas fa-check icon"
                }
              />
            </span>{" "}
            <span
              onClick={() => {
                handleDelete();
              }}
              className="icon-span text-danger col-1
                  mx-auto
                  col-lg-1"
            >
              <i className="fas fa-trash-alt icon" />
            </span>
          </>
        ) : (
          <>
            <span className="icon-span col-1 mx-auto col-lg-1">
              <i
                className={
                  list.listFinished
                    ? "fas fa-undo-alt icon"
                    : "fas fa-check hidden-icon"
                }
              />{" "}
            </span>
            <span
              className="icon-span text-danger col-1
                  mx-auto
                  col-lg-1"
              onClick={() => {
                handleRemoveShare();
              }}
            >
              <i className="fas fa-minus-circle icon" />
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default ListMenuItem;
