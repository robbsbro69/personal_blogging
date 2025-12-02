const express = require("express");
const blogRouter = express.Router();
const {
  addBlog,
  getBlog,
  delBlog,
  updateBlog,
} = require("../controllers/blog.controller");

blogRouter.post("/", addBlog);
blogRouter.get("/", getBlog);
blogRouter.delete("/:id", delBlog);
blogRouter.patch("/:id", updateBlog);

module.exports = blogRouter;
