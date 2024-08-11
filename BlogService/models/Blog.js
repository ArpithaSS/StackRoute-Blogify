const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  blogId:{
    type: Number,
    required: true,
    unique: true
  },
  title:{
    type: String,
    required: true
  },
  content:{
    type: String,
    required: true
  },
  author:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

module.exports = mongoose.model('Blog', blogSchema, 'Blogs');
