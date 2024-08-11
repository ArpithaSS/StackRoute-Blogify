const {
    GetBlog,
    GetBlogs,
    AddBlog,
    DeleteBlog,
    UpdateBlog,
  } = require("../controllers/BlogController");
  const { VerifyTokenMiddleware } = require("../middlewares");
  const express = require("express");
  const router = express.Router();
  
  router.get("/blogs", GetBlogs);
  router.get("/blogs/:id", VerifyTokenMiddleware, GetBlog);
  router.post("/blogs", VerifyTokenMiddleware, AddBlog);
  router.delete("/blogs/:id", VerifyTokenMiddleware,DeleteBlog);
  router.put("/blogs/:id", VerifyTokenMiddleware, UpdateBlog);
  
  module.exports = router;
  