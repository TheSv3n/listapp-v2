import asyncHandler from "express-async-handler";
import ShareRequest from "../models/shareRequestModel.js";

//@desc Create new share request
//@route POST /api/sharerequests
//@access Private
const createShareRequest = asyncHandler(async (req, res) => {
  const { requestTo, listId, listName } = req.body;

  const shareRequest = new ShareRequest({
    requestFrom: req.user._id,
    requestTo,
    fromName: req.user.userName,
    listId,
    listName,
    dateSent: Date.now(),
  });

  const createdShareRequest = await shareRequest.save();

  res.status(201).json(createdShareRequest);
});

//@desc Update share request response
//@route PUT /api/sharerequests/:id/respond
//@access Private
const updateShareResponse = asyncHandler(async (req, res) => {
  const shareRequest = await ShareRequest.findById(req.params.id);

  if (shareRequest) {
    shareRequest.response = req.body.response;

    const updatedShareResponse = await shareRequest.save();
    res.json(updatedShareResponse);
  } else {
    res.status(404);
    throw new Error("Request not Found");
  }
});

//@desc Get a users received share requests
//@route GET /api/sharerequests/received
//@access Private
const getReceivedShareRequests = asyncHandler(async (req, res) => {
  const shareRequests = await ShareRequest.find({ requestTo: req.user._id });
  res.json(shareRequests);
});

//@desc Get a users received share requests
//@route GET /api/sharerequests/sent
//@access Private
const getSentShareRequests = asyncHandler(async (req, res) => {
  const shareRequests = await ShareRequest.find({
    requestFrom: req.user._id,
    response: 0,
  });
  res.json(shareRequests);
});

export {
  createShareRequest,
  updateShareResponse,
  getReceivedShareRequests,
  getSentShareRequests,
};
