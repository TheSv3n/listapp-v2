import asyncHandler from "express-async-handler";
import List from "../models/listModel.js";

//@desc Create new list
//@route POST /api/lists
//@access Private
const createList = asyncHandler(async (req, res) => {
  const { listName, owner, listType, dateAdded } = req.body;

  const list = new List({
    listName,
    owner,
    sharedWith: [],
    listType,
    dateAdded,
  });

  const createdList = await list.save();

  res.status(201).json(createdList);
});

//@desc Get a users lists
//@route GET /api/orders/userlists
//@access Private
const getUserLists = asyncHandler(async (req, res) => {
  const lists = await Order.find({ user: req.user._id });
  res.json(lists);
});

export { createList, getUserLists };
