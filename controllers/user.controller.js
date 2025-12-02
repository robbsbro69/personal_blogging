const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// SignUp Route
const signup = async (req, res) => {
  const user = req.body;
  if (!user.fullName || !user.emailId || !user.password) {
    return res
      .status(401)
      .json({ success: false, message: "Enter all your details" });
  }

  const newUser = new User(user);
  try {
    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "User signed up successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: "SignUp Failed" });
  }
};

// SignIn Route
const signin = async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!emailId || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Enter all credentials" });
    }

    const user = await User.find({ emailId });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Password doesn't match" });
    }

    const token = await jwt.sign(
      { id: user._id, emailId: user.emailId },
      process.env.JWT,
      { expiresIn: "1d" }
    );

    res
      .cookie("token", token, { httpOnly: true })
      .status(200)
      .json({ success: true, message: "Signed In Successfully " });
  } catch (error) {
    res.status(400).json({ success: false, message: "Sign Up Failed" });
  }
};

// Get all user details
const getAllUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res
      .status(401)
      .json({ success: false, message: "Failed to get user data" });
  }
};

// Get a user detail by id
const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid id" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res
      .status(401)
      .json({ success: false, message: "Failed to get user data" });
  }
};

// Delete a user by id
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid id" });
    }

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully " });
  } catch (error) {
    res
      .status(401)
      .json({ success: false, message: "Failed to delete user data" });
  }
};

// Update a user by id
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid id" });
    }
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, message: "Updated successfully" });
  } catch (error) {
    res
      .status(401)
      .json({ success: false, message: "Failed to updated user data" });
  }
};

module.exports = {
  signup,
  signin,
  getAllUser,
  getSingleUser,
  deleteUser,
  updateUser,
};
