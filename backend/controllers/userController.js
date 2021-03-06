import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

//@desc Register a new user
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { userName, firstName, lastName, email, password } = req.body;

  const userExists =
    (await User.findOne({ email: email })) ||
    (await User.findOne({ userNameLower: userName.toLowerCase() }));

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const name = `${firstName} ${lastName}`;

  const user = await User.create({
    userName,
    name,
    email: email.toLowerCase(),
    password,
    userNameLower: userName.toLowerCase(),
    friends: [],
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      userName: user.userName,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc Auth user & get token
//@route POST /api/users/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
  const { userName, password } = req.body;
  let user;

  if (
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      userName.toLowerCase()
    )
  ) {
    user = await User.findOne({ email: userName.toLowerCase() });
  } else {
    user = await User.findOne({ userNameLower: userName.toLowerCase() });
  }

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      userName: user.userName,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//@desc Update users friends list - add friend
//@route PUT /api/users/:id/friendadd
//@access Private
const addUserFriend = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    let tempFriends = [...user.friends, req.body.friendId];
    user.friends = tempFriends;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

//@desc Update users friends list - removefriend
//@route PUT /api/users/:id/friendremove
//@access Private
const removeUserFriend = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    let tempFriends = [...user.friends];
    let index = tempFriends.indexOf(req.body.friendId);
    tempFriends.splice(index, 1);
    user.friends = tempFriends;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

//@desc Get user by ID
//@route GET /api/users/:id
//@access Private
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc Get users friend list
//@route POST /api/users/friendlist
//@access Private
const getFriendList = asyncHandler(async (req, res) => {
  const friendIds = req.body.friendList;
  let friends = [];
  for (var i = 0; i < friendIds.length; i++) {
    let user = await User.findById(friendIds[i]).select("-password");
    if (user) {
      friends.push(user);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  }

  res.json(friends);
});

//@desc Get search results
//@route GET /api/users/search?searchString
//@access Private
const getSearchResults = asyncHandler(async (req, res) => {
  const searchString = req.query.searchString;
  const users = await User.find({
    userName: { $regex: new RegExp(searchString, "i") },
  }).select("-password");

  res.json(users);
});

export {
  registerUser,
  authUser,
  addUserFriend,
  removeUserFriend,
  getUserById,
  getFriendList,
  getSearchResults,
};
