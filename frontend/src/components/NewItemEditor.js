import React, { useState, useEffect } from "react";
import { createListItem } from "../actions/listItemActions";
import { getUserDetails } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const NewItemEditor = ({ history, listId }) => {
  const dispatch = useDispatch();
  const [itemName, setItemName] = useState("");
  const [cost, setCost] = useState(0.0);
  const [description, setDescription] = useState("");
  const [optionsShow, setOptionsShow] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createListItem({
        name: itemName,
        cost: cost,
        description: description,
        list: listId,
        dateAdded: Date.now(),
      })
    );
    setItemName("");
    setCost(0);
    setDescription("");
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user) {
        dispatch(getUserDetails(userInfo._id));
      }
    }
  }, [dispatch, , userInfo, user]);

  const handleOptionsToggle = (e) => {
    e.preventDefault();
    setOptionsShow(!optionsShow);
  };

  return (
    <li className="list-group-item text-capitalize my-1 my-md-2 my-lg-2">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="input-group col-8  my-1 mr-auto">
            <div className="input-group-prepend">
              <div className="input-group-text bg-primary text-white">
                <i className="fas fa-book" />
              </div>
            </div>
            <input
              type="text"
              className="form-control text-capitalize"
              placeholder="Item"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </div>

          <div className="input-group col-4 my-1 ml-auto ">
            <div className="input-group-prepend">
              <div className="input-group-text bg-primary text-white d-none d-lg-block d-md-block">
                <i className="fas fa-pound-sign " />
              </div>
            </div>
            <input
              type="currency"
              className="form-control text-capitalize"
              placeholder="Price"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </div>
        </div>
        <div className="row d-none d-lg-block d-md-block">
          <div className="input-group col-12 my-1">
            <div className="input-group-prepend">
              <div className="input-group-text bg-primary text-white">
                <i className="fas fa-info" />
              </div>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Info"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="row mx-auto">
          <button
            type="submit"
            className="btn btn-block btn-primary col-5 mr-auto mt-1"
          >
            Add Item
          </button>

          <button
            onClick={handleOptionsToggle}
            className="btn btn-block btn-info col-6 ml-auto mt-1"
          >
            {optionsShow ? "List Options -" : "List Options +"}
          </button>
        </div>
        {optionsShow ? (
          <React.Fragment>
            <div className="text-center">
              <span>List Shared With</span>
            </div>
            <>
              {/*(value) => {
                // eslint-disable-next-line
                return value.friendsList.map((friend) => {
                  //console.log(friend._id);

                  var isShared = "false";
                  if (value.activeListSharedWith.length === 0) {
                    return "";
                  } else {
                    for (
                      var i = 0;
                      i < value.activeListSharedWith.length;
                      i++
                    ) {
                      if (friend._id === value.activeListSharedWith[i]) {
                        isShared = "true";
                        return (
                          <ListFriendElement
                            key={friend._id}
                            isShared={isShared}
                            isOwner="false"
                            friend={friend}
                            shareRequested="false"
                          />
                        );
                      } else if (friend._id === value.activeListOwner) {
                        isShared = "true";
                        return (
                          <ListFriendElement
                            key={friend._id}
                            isShared={isShared}
                            isOwner="true"
                            friend={friend}
                            shareRequested="false"
                          />
                        );
                      } else {
                        //console.log("returned");
                        //return "";
                      }
                    }
                  }
                });
              }*/}
            </>

            <div className="text-center">
              <span>Other Friends</span>
            </div>
            <>
              {/*(value) => {
                // eslint-disable-next-line
                return value.friendsList.map((friend) => {
                  var isShared = "false";
                  var shareRequested = "false";

                  if (value.activeListSharedWith.length === 0) {
                    isShared = "false";
                  } else {
                    for (
                      var i = 0;
                      i < value.activeListSharedWith.length;
                      i++
                    ) {
                      if (
                        friend._id !== value.activeListSharedWith[i] &&
                        friend._id !== value.activeListOwner
                      ) {
                      } else {
                        isShared = "true";
                      }
                    }
                  }

                  if (value.sentShareRequests.length === 0) {
                    shareRequested = "false";
                  } else {
                    for (var j = 0; j < value.sentShareRequests.length; j++) {
                      if (
                        friend._id === value.sentShareRequests[j].requestTo &&
                        value.sentShareRequests[j].listId === value.list
                      ) {
                        shareRequested = "true";
                      }
                    }
                  }

                  if (isShared === "false") {
                    return (
                      <ListFriendElement
                        key={friend._id}
                        isShared={isShared}
                        isOwner="false"
                        friend={friend}
                        shareRequested={shareRequested}
                      />
                    );
                  } else {
                    return "";
                  }
                });
              }*/}
            </>
          </React.Fragment>
        ) : (
          ""
        )}
      </form>
    </li>
  );
};

export default NewItemEditor;
