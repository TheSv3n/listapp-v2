import React from "react";
import { useDispatch } from "react-redux";
import { shareRequestRespond } from "../actions/shareRequestActions";
import { listShareAdd } from "../actions/listActions";

const ShareRequest = ({ shareRequest }) => {
  const dispatch = useDispatch();

  const handleShareResponse = (response) => {
    dispatch(shareRequestRespond(shareRequest._id, response));
    if (response === 1) {
      dispatch(listShareAdd(shareRequest.listId, shareRequest.requestTo));
    }
  };
  return (
    <li className="list-group-item text-capitalize d-flex text-center my-2">
      <div className="container-fluid text-center ">
        <div className="row">
          <div className="col-3 mx-auto col-lg-3">{shareRequest.fromName}</div>
          <div className="col-3 mx-auto col-lg-3">{shareRequest.listName}</div>
          <div className="mx-auto">
            <div className="input-group">
              <span
                className="icon-span text-success col-1 mx-auto col-lg-1"
                onClick={() => {
                  handleShareResponse(1);
                }}
              >
                <i className="fas fa-plus-circle icon" />
              </span>
              <span
                className="icon-span text-danger col-1 mx-auto col-lg-1"
                onClick={() => {
                  handleShareResponse(2);
                }}
              >
                <i className="fas fa-minus-circle icon" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ShareRequest;
