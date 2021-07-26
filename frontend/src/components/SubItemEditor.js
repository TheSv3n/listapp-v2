import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "../css/NewItemEditor.css";
import { createSubItem } from "../actions/listItemActions";

const SubItemEditor = ({ listItemId }) => {
  const dispatch = useDispatch();
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createSubItem(listItemId, {
        name: itemName,
        description: description,
        dateAdded: Date.now(),
      })
    );
    setItemName("");
  };

  return (
    <>
      <li className="my-1 my-md-2 my-lg-2 col-11 ml-auto">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="input-group col-7  my-1 mr-auto">
              <div className="input-group-prepend">
                <div className="input-group-text bg-primary text-white">
                  <i className="fas fa-book" />
                </div>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Sub-Item"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-block btn-primary col-4 mr-auto mt-1"
            >
              Add Sub-Item
            </button>
          </div>
        </form>
      </li>
    </>
  );
};

export default SubItemEditor;
