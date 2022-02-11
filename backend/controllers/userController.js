const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const { generateToken } = require("../generateToken");

// @desc        Register new user
// @route       /api/user/register
// @access      PUBLIC
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please include all fields to register user");
  }

  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);

  const user = await User.create({
    name: name,
    email: email,
    password: hash,
  });

  res.json({
    id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
});

// @desc        Login user
// @route       /api/user/login
// @access      PUBLIC
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  if (!bcrypt.compareSync(password, user.password)) {
    res.status(400);
    throw new Error("Invalid credentials");
  }

  res.json({
    id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
});

// @desc        Get current user
// @route       /api/user/me
// @access      PRIVATE
const getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };

  res.json(user);
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
