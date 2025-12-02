const express = require("express");
const userRouter = express.Router();

const {
  signup,
  signin,
  getAllUser,
  getSingleUser,
  deleteUser,
  updateUser,
} = require("../controllers/user.controller");

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.get("/", getAllUser);
userRouter.get("/:id", getSingleUser);
userRouter.delete("/:id", deleteUser);
userRouter.patch("/:id", updateUser);

module.exports = userRouter;
