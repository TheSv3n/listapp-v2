import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  completeList,
  deleteList,
  listShareRemove,
} from "../actions/listActions";

const ListMenuItem = ({ list, history }) => {
  const dispatch = useDispatch();
  const [showOptions, setShowOptions] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const clickHandler = () => {
    history.push(`/list/${list._id}`);
  };

  const handleListChecked = () => {
    dispatch(completeList(list._id));
  };

  const handleRemoveShare = () => {
    dispatch(listShareRemove(list._id, userInfo._id));
  };

  const handleDelete = () => {
    dispatch(deleteList(list._id));
  };

  return (
    <div className="container d-inline">
      <div className="row">
        <li
          className={`list-group-item ${
            list.listFinished ? "list-group-item-done" : ""
          }  list-menu-item d-flex text-center my-1 my-md-2 my-lg-2 ${
            showOptions ? "col-8" : "col-10 col-md-11"
          }`}
          onClick={() => {
            clickHandler();
          }}
        >
          <div className="container-fluid text-center ">
            <div className="row">
              <div className="mr-auto dark-text ">{list.listName}</div>
              <span className="ml-auto icon-span text-white">
                <i className="fas fa-trash-alt icon" />
              </span>
            </div>
          </div>
        </li>
        {showOptions ? (
          userInfo._id === list.owner ? (
            <>
              <div className="mx-auto my-auto">
                <span
                  className="icon-span"
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
                </span>
                <span
                  onClick={() => {
                    handleDelete();
                  }}
                  className="icon-span text-danger col-1"
                >
                  <i className="fas fa-trash-alt icon" />
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="mx-auto my-auto">
                <span className="icon-span">
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
                  col-lg-1"
                  onClick={() => {
                    handleRemoveShare();
                  }}
                >
                  <i className="fas fa-minus-circle icon" />
                </span>
              </div>
            </>
          )
        ) : (
          ""
        )}
        <span
          className="icon-span text-secondary col-1 ml-auto my-auto"
          onClick={() => {
            setShowOptions(!showOptions);
          }}
        >
          <i className="fas fa-bars icon"></i>
        </span>
      </div>
    </div>
  );
};

export default ListMenuItem;
