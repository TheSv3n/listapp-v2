import asyncHandler from "express-async-handler";
import FriendRequest from "../models/friendRequestModel.js";

//@desc Create new friend request
//@route POST /api/friendrequests
//@access Private
const createFriendRequest = asyncHandler(async (req, res) => {
  const { requestTo } = req.body;

  const friendRequest = new FriendRequest({
    requestFrom: req.user._id,
    requestTo,
    fromName: req.user.userName,

    dateSent: Date.now(),
  });

  const createdFriendRequest = await friendRequest.save();

  res.status(201).json(createdFriendRequest);
});

//@desc Update friend request response
//@route PUT /api/friendrequests/:id/respond
//@access Private
const updateFriendResponse = asyncHandler(async (req, res) => {
  const friendRequest = await FriendRequest.findById(req.params.id);

  if (friendRequest) {
    friendRequest.response = req.body.response;

    const updatedFriendResponse = await friendRequest.save();
    res.json(updatedFriendResponse);
  } else {
    res.status(404);
    throw new Error("Request not Found");
  }
});

export { createFriendRequest, updateFriendResponse };
