import asyncHandler from "express-async-handler";
import ListItem from "../models/listItemModel.js";

//@desc Create new list item
//@route POST /api/listitems
//@access Private
const createListItem = asyncHandler(async (req, res) => {
  const { name, list, cost, description, dateAdded } = req.body;

  const listItem = new ListItem({
    name,
    list,
    addedBy: req.user._id,
    cost,
    description,
    dateAdded,
  });

  const createdListItem = await listItem.save();

  res.status(201).json(createdListItem);
});

//@desc Get a lists items
//@route GET /api/listitems/:id
//@access Private
const getListItems = asyncHandler(async (req, res) => {
  const listItems = await ListItem.find({ list: req.params.id });
  res.json(listItems);
});

//@desc Update items completed status
//@route PUT /api/listitems/:id/completed
//@access Private/Admin
const updateCompleted = asyncHandler(async (req, res) => {
  const listItem = await ListItem.findById(req.params.id);

  if (listItem) {
    listItem.completed = req.body.completed;
    if (listItem.completed) {
      listItem.dateCompleted = Date.now();
    } else {
      listItem.dateCompleted = "";
    }

    const updatedListItem = await listItem.save();
    res.json(updatedListItem);
  } else {
    res.status(404);
    throw new Error("Item not Found");
  }
});

export { createListItem, getListItems, updateCompleted };
