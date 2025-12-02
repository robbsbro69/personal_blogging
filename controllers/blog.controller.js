const Blog = require("../models/blog.model");
const mongoose = require("mongoose");

const addBlog = async (req, res) => {
  const blog = req.body;
  if (!blog.title || !blog.description || !blog.body) {
    return res
      .status(400)
      .json({ success: false, message: "Enter all details" });
  }

  const newBlog = await new Blog(blog);

  try {
    await newBlog.save();
    res.status(200).json({ success: true, message: "Blog added successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to add blog" });
  }
};

const getBlog = async (req, res) => {
  try {
    const allBlog = await Blog.find({});
    res.status(200).json({ success: true, data: allBlog });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to get all blog" });
  }
};

const delBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid id" });
  }
  try {
    await Blog.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Deletion Failed" });
  }
};

const updateBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid id" });
  }

  const updatedBlog = req.body;
  try {
    await Blog.findByIdAndUpdate(id, updatedBlog, { new: true });
    res
      .status(200)
      .json({ success: true, message: "Blog updated successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to update blog" });
  }
};

module.exports = { addBlog, getBlog, delBlog, updateBlog };
