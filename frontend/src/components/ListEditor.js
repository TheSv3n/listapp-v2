import React, { useState, useEffect } from "react";
import { createList } from "../actions/listActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { CREATE_LIST_RESET } from "../constants/listContstants";
import { useHistory } from "react-router";

const ListEditor = () => {
  const dispatch = useDispatch();
  const [listName, setListName] = useState("");
  const history = useHistory();

  const handleNewList = (e) => {
    e.preventDefault();
    dispatch(
      createList({ listName: listName, listType: 0, dateAdded: Date.now() })
    );
    setListName("");
  };

  const listCreate = useSelector((state) => state.listCreate);
  const { success, loading, list } = listCreate;

  useEffect(() => {
    if (success) {
      dispatch({ type: CREATE_LIST_RESET });
      history.push(`/list/${list._id}`);
    }
  }, [dispatch, history, success, list]);

  return (
    <li className="list-group-item my-1 my-md-2 my-lg-2">
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={handleNewList}>
          <div className="row">
            <div className="input-group col-12  my-1 mr-auto">
              <div className="input-group-prepend">
                <div className="input-group-text bg-primary text-white">
                  <i className="fas fa-book" />
                </div>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="List Name"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
              />

              <button
                type="submit"
                className="btn btn-block btn-primary mx-3 col-5 ml-auto"
              >
                Create List
              </button>
            </div>
          </div>
        </form>
      )}
    </li>
  );
};

export default ListEditor;
