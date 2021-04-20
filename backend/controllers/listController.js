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
  res.json(lists);
});

//@desc Update list finished status
//@route PUT /api/lists/:id/finished
//@access Private
const updateListFinished = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.id);

  if (list) {
    list.listFinished = !list.listFinished;

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

//@desc Update items deleted status
//@route PUT /api/lists/:id/deleted
//@access Private
const updateListDeleted = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.id);

  if (list) {
    list.listDeleted = !list.listDeleted;

    if (list.listDeleted) {
      list.dateDeleted = Date.now();
    } else {
      list.dateDeleted = "";
    }

    const updatedList = await list.save();
    res.json(updatedList);
  } else {
    res.status(404);
    throw new Error("List not Found");
  }
});

//@desc Update lists shared user list - add user
//@route PUT /api/lists/:id/shareadd
//@access Private
const addListShare = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.id);

  if (list) {
    let tempShares = [...list.sharedWith, req.body.userId];
    list.sharedWith = tempShares;
    const updatedList = await list.save();
    res.json(updatedList);
  } else {
    res.status(404);
    throw new Error("List not Found");
  }
});

//@desc Update lists shared user list - remove user
//@route PUT /api/lists/:id/shareremove
//@access Private
const removeListShare = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.id);

  if (list) {
    let tempShares = [...list.sharedWith];
    let index = tempShares.indexOf(req.body.userId);
    tempShares.splice(index, 1);
    list.sharedWith = tempShares;
    const updatedList = await list.save();
    res.json(updatedList);
  } else {
    res.status(404);
    throw new Error("List not Found");
  }
});

//@desc Get list information
//@route GET /api/lists/:id
//@access Private
const getListInfo = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.id);

  if (list) {
    res.json(list);
  } else {
    res.status(404);
    throw new Error("List not Found");
  }
});

export {
  createList,
  getUserLists,
  updateListFinished,
  updateListDeleted,
  addListShare,
  removeListShare,
  getSharedLists,
  getListInfo,
};
