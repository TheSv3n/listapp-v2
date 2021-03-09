import asyncHandler from "express-async-handler";
import List from "../models/listModel.js";

//@desc Create new list
//@route POST /api/lists
//@access Private
const createList = asyncHandler(async (req, res) => {
  const { listName, listType, dateAdded } = req.body;

  const list = new List({
    listName,
    owner: req.user._id,
    sharedWith: [],
    listType,
    dateAdded,
  });

  const createdList = await list.save();

  res.status(201).json(createdList);
});

//@desc Get a users lists
//@route GET /api/lists/userlists
//@access Private
const getUserLists = asyncHandler(async (req, res) => {
  const lists = await List.find({ owner: req.user._id });
  res.json(lists);
});

//@desc Get a users shared lists
//@route GET /api/lists/sharedlists
//@access Private
const getSharedLists = asyncHandler(async (req, res) => {
  const lists = await List.find({ sharedWith: req.user._id });
  console.log(req.user._id);
  res.json(lists);
});

//@desc Update list finished status
//@route PUT /api/lists/:id/finished
//@access Private
const updateListFinished = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.id);

  if (list) {
    list.listFinished = req.body.listFinished;

    if (list.listFinished) {
      list.dateCompleted = Date.now();
    } else {
      list.dateCompleted = "";
    }

    const updatedList = await list.save();
    res.json(updatedList);
  } else {
    res.status(404);
    throw new Error("List not Found");
  }
});

//@desc Update lists shared user list
//@route PUT /api/lists/:id/sharelist
//@access Private
const updateListShares = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.id);

  if (list) {
    list.sharedWith = req.body.sharedWith;

    const updatedList = await list.save();
    res.json(updatedList);
  } else {
    res.status(404);
    throw new Error("List not Found");
  }
});

export {
  createList,
  getUserLists,
  updateListFinished,
  updateListShares,
  getSharedLists,
};
