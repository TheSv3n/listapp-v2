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

//@desc Get a users received friend requests
//@route GET /api/friendrequests/received
//@access Private
const getReceivedFriendRequests = asyncHandler(async (req, res) => {
  const friendRequests = await FriendRequest.find({
    requestTo: req.user._id,
    response: 0,
  });
  res.json(friendRequests);
});

//@desc Get a users received friend requests
//@route GET /api/friendrequests/sent
//@access Private
const getSentFriendRequests = asyncHandler(async (req, res) => {
  const friendRequests = await FriendRequest.find({
    requestFrom: req.user._id,
    response: 0,
  });
  res.json(friendRequests);
});

export {
  createFriendRequest,
  updateFriendResponse,
  getReceivedFriendRequests,
  getSentFriendRequests,
};
