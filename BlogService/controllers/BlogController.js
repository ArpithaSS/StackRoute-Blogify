const Blog = require("../models/Blog");

const GetBlogs = async (req, res) => {
  let blogs = await Blog.find({});
  res.send(blogs);
};

const GetBlog = async (req, res) => {
  try {
    let blog = await Blog.findOne({ blogId: req.params.id });
    console.log("Result", req.params.id);
    if (!blog) {
      res.status(404).send({ message: "Blog not found" });
    }
    if (blog.author.toString() !== req.user._id.toString()) {
      res.status(403).send({ message: "You are not authorized to update this blog" });
    }
    else {
      res.send(blog);
    }
  }
  catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error fetching blog" });
  }
};


const AddBlog = async (req, res) => {
  console.log("User id is",req.user._id);
    let blog = new Blog({
      blogId: req.body.blogId,
      title: req.body.title,
      content: req.body.content,
      author: req.user._id,
    });
    await blog.save();
    res.send({ status: 201, message: "Blog added successfully" });
};

const DeleteBlog = async (req, res) => {
  console.log("req", req.user._id);
  try {
    let blog = await Blog.findOne({blogId: req.params.id});
    console.log("Author",blog.author);
    if (!blog) {
      res.status(404).send({ message: "Blog not found" });
    }
    if (blog.author.toString() !== req.user._id.toString()) {
      res.status(403).send({ message: "You are not authorized to update this blog" });
    }
    else {
    await Blog.deleteOne({ blogId: req.params.id });
    res.send({ status: 200, message: "Blog deleted successfully" });
    }
  }
  catch(error) {
    console.log(error);
    res.status(500).send({message: "Error deleting this blog"});
  }

};

const UpdateBlog = async (req, res) => {
  try {
    let blog = await Blog.findOne({blogId: req.params.id});
    if (!blog) {
      res.status(404).send({ message: "Blog not found" });
    }
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).send({ message: "You are not authorized to update this blog" });
    }
    await Blog.updateOne(
      { blogId: req.params.id },
      {
        title: req.body.title,
        content: req.body.content,
      }
    );
    res.send({ status: 200, message: "Blog updated successfully" });
  }
  catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error updating blog" });
  }
};

module.exports = { GetBlogs, GetBlog, AddBlog, DeleteBlog, UpdateBlog };
