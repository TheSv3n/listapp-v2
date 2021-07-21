import React, { useState, useEffect } from "react";

import "../css/NewItemEditor.css";

const SubItemEditor = ({ listItemId }) => {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {};

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
                placeholder="Item"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-block btn-primary col-4 mr-auto mt-1"
            >
              Add Item
            </button>
          </div>
        </form>
      </li>
    </>
  );
};

export default SubItemEditor;
