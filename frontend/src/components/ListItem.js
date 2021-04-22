import React, { useState } from "react";
import { completeListItem, deleteListItem } from "../actions/listItemActions";
import { Image } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

const ListItem = ({ listItem }) => {
  const itemId = listItem._id;
  const dispatch = useDispatch();

  const listInfo = useSelector((state) => state.listInfo);
  const { list } = listInfo;

  const listItemComplete = useSelector((state) => state.listItemComplete);
  const { error: completeError } = listItemComplete;

  const listId = list._id;

  const [infoShow, setInfoShow] = useState(false);
  const [pictureShow, setPictureShow] = useState(false);

  const handleInfoToggle = () => {
    setInfoShow(!infoShow);
  };

  const handlePictureToggle = () => {
    setPictureShow(!pictureShow);
  };

  const handleChecked = () => {
    dispatch(completeListItem(itemId, listId));
  };

  const handleEdit = () => {};

  const handleDelete = () => {
    dispatch(deleteListItem(itemId, listId));
  };

  return (
    <li
      className={
        listItem.completed
          ? "list-group-item list-group-item-done d-flex text-center my-1 my-md-2 my-lg-2"
          : "list-group-item d-flex text-center my-1 my-md-2 my-lg-2"
      }
    >
      <div className="container-fluid text-center ">
        <div className="row">
          <div className="icon-span text-warning col-2 mx-auto col-lg-1 d-inline">
            <i
              className="fas icon fa-info-circle d-inline"
              onClick={() => {
                handleInfoToggle();
              }}
            />
            {listItem.image && listItem.image !== "" ? (
              <i
                className="fas icon fa-image text-success ml-1 d-inline"
                onClick={() => {
                  handlePictureToggle();
                }}
              />
            ) : (
              ""
            )}
            {completeError ? (
              <>
                <i className="fas fa-exclamation-triangle text-danger ml-1 d-inline" />{" "}
              </>
            ) : (
              ""
            )}
          </div>
          <div className="col-3 mx-auto col-lg-5">{listItem.name}</div>
          <div className="col-1 mx-auto col-lg-1 ">{listItem.cost}</div>
          <div>
            <span
              className="icon-span col-1 mx-auto col-lg-1"
              onClick={() => {
                handleChecked();
              }}
            >
              <i
                className={
                  listItem.completed
                    ? "text-danger fas fa-undo-alt icon"
                    : "text-success fas fa-check icon"
                }
              />{" "}
            </span>{" "}
            <span
              onClick={() => {
                handleEdit();
              }}
              className="icon-span text-primary col-1
        mx-auto
          col-lg-1 d-none d-lg-inline d-md-inline"
            >
              <i className="fas fa-edit icon" />
            </span>
            <span
              onClick={() => {
                handleDelete();
              }}
              className="icon-span text-danger col-1
        mx-auto
        col-lg-1 d-none d-lg-inline d-md-inline"
            >
              <i className="fas fa-trash-alt icon" />
            </span>
          </div>
        </div>

        {pictureShow ? (
          <div className="row">
            <div className="mx-auto col-6">
              <Image src={listItem.image} alt={listItem.name} fluid></Image>
            </div>
          </div>
        ) : (
          ""
        )}

        {infoShow ? (
          <div className="row">
            <span className="info-span col-8">{listItem.description}</span>
            <span
              onClick={() => {
                handleEdit();
              }}
              className="icon-span text-primary col-1
        mx-auto
          col-lg-1 d-inline d-lg-none d-md-none"
            >
              <i className="fas fa-edit icon" />
            </span>
            <span
              onClick={() => {
                handleDelete();
              }}
              className="icon-span text-danger col-1
        mx-auto
        col-lg-1 d-inline d-lg-none d-md-none"
            >
              <i className="fas fa-trash-alt icon" />
            </span>
          </div>
        ) : (
          ""
        )}
      </div>
    </li>
  );
};

export default ListItem;
