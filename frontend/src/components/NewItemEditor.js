import React, { useState, useEffect } from "react";
import { createListItem } from "../actions/listItemActions";
import { getUserDetails, getFriendList } from "../actions/userActions";
import { getSentShareRequests } from "../actions/shareRequestActions";
import { useDispatch, useSelector } from "react-redux";
import ListFriendElement from "../components/ListFriendElement";
import Loader from "../components/Loader";
import axios from "axios";
import "../css/NewItemEditor.css";

const NewItemEditor = ({ history, listId }) => {
  const dispatch = useDispatch();
  const [itemName, setItemName] = useState("");
  const [cost, setCost] = useState();
  const [description, setDescription] = useState("");
  const [optionsShow, setOptionsShow] = useState(false);
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [imageName, setImageName] = useState("No Image");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const friendDetails = useSelector((state) => state.friendDetails);
  const { friendList } = friendDetails;

  const sentShareRequests = useSelector((state) => state.sentShareRequests);
  const { requests } = sentShareRequests;

  const listInfo = useSelector((state) => state.listInfo);
  const { list } = listInfo;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createListItem({
        name: itemName,
        cost: cost,
        description: description,
        list: listId,
        image: image,
        dateAdded: Date.now(),
      })
    );

    setItemName("");
    setCost("");
    setDescription("");
    document.getElementById("image-form").value = "";
    setImageName("No Image");
    setImage("");
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user) {
        dispatch(getUserDetails(userInfo._id));
      } else {
        if (!friendList) {
          dispatch(getFriendList(user.friends));
        }
        if (!requests) {
          dispatch(getSentShareRequests());
        }
      }
    }
  }, [dispatch, userInfo, user, friendList, requests, history]);

  const handleOptionsToggle = (e) => {
    e.preventDefault();
    setOptionsShow(!optionsShow);
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "mutipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);
      setImage(data);
      setUploading(false);
      setImageName(e.target.value);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const clearImageHandler = () => {
    document.getElementById("image-form").value = "";
    setImageName("No Image");
    setImage("");
  };

  return (
    <li className="list-group-item my-1 my-md-2 my-lg-2">
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
              className="form-control"
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
              className="form-control"
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

        <div className="row d-block my-2">
          <div className="input-group col-12 ">
            <label for="image-form" className="mr-1 my-auto">
              <i className="fas fa-image" /> Add Image
            </label>
            <input
              id="image-form"
              type="file"
              className="form-file"
              onChange={uploadFileHandler}
            />
            {uploading ? (
              <Loader />
            ) : (
              <div className="d-flex col-6 my-auto">
                <div className="d-none d-md-flex d-lg-flex">{imageName}</div>
                {image === "" ? (
                  ""
                ) : (
                  <button
                    className="btn btn-block btn-danger col-3 ml-2"
                    onClick={clearImageHandler}
                  >
                    Clear
                  </button>
                )}
              </div>
            )}
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
          <>
            <div className="text-center">
              <span>List Shared With</span>
            </div>
            <>
              {
                // eslint-disable-next-line
                friendList.map((friend) => {
                  var isShared = false;
                  if (list.sharedWith.length === 0) {
                    return "";
                  } else {
                    for (let i = 0; i < list.sharedWith.length; i++) {
                      if (friend._id === list.sharedWith[i]) {
                        isShared = true;
                        return (
                          <ListFriendElement
                            key={friend._id}
                            isShared={isShared}
                            isOwner={false}
                            friend={friend}
                            shareRequested={false}
                          />
                        );
                      } else if (friend._id === list.owner) {
                        isShared = true;
                        return (
                          <ListFriendElement
                            key={friend._id}
                            isShared={isShared}
                            isOwner={true}
                            friend={friend}
                            shareRequested="false"
                          />
                        );
                      } else {
                        //return "";
                      }
                    }
                  }
                })
              }
            </>

            <div className="text-center">
              <span>Other Friends</span>
            </div>
            <>
              {friendList.map((friend) => {
                let isShared = false;
                let shareRequested = false;

                if (list.sharedWith.length === 0) {
                  isShared = false;
                } else {
                  for (var i = 0; i < list.sharedWith.length; i++) {
                    if (
                      friend._id !== list.sharedWith[i] &&
                      friend._id !== list.owner
                    ) {
                    } else {
                      isShared = true;
                    }
                  }
                }
                if (requests) {
                  if (requests.length === 0) {
                    shareRequested = false;
                  } else {
                    for (var j = 0; j < requests.length; j++) {
                      if (
                        friend._id === requests[j].requestTo &&
                        requests[j].listId === list._id
                      ) {
                        shareRequested = true;
                      }
                    }
                  }
                }

                if (isShared === false) {
                  return (
                    <ListFriendElement
                      key={friend._id}
                      isShared={isShared}
                      isOwner={false}
                      friend={friend}
                      isRequested={shareRequested}
                    />
                  );
                } else {
                  return "";
                }
              })}
            </>
          </>
        ) : (
          ""
        )}
      </form>
    </li>
  );
};

export default NewItemEditor;
