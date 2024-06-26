const createError = require('http-errors');

const User = require('../Models/user.model');
const Post = require('../Models/post.model');

const postController = {
  getAllPost: async (req, res, next) => {
    try {
      const sortBy = req.query.sortBy;

      const posts = await Post.find()?.sort(sortBy);
      const totalPost = await Post.find().countDocuments();

      res
        .status(200)
        .json({ status: 'isOkay', totalPost, elements: posts });
    } catch (error) {
      next(error);
    }
  },

    getOnePost: async (req, res, next) => {
      try {
        const post = await Post.findById(req.params.id);
        res.status(200).json({ status: 'isOkay', elements: post });
      } catch (error) {
        next(error);
      }
    },

  createNewPost: async (req, res, next) => {
    try {
      const newPost = new Post(req.body);
      const savedPost = await newPost.save();

      if (req.body.user_id) {
        const user = await User.findById(req.body.user_id);
        await user.updateOne({ $push: { posts: savedPost._id } });
      }
      res.status(200).json(savedPost);
    } catch (error) {
      next(error);
    }
  },

  deletePost: async (req, res, next) => {
    try {
      const post = await Post.findByIdAndDelete(req.params.id);

      if (!post) {
        throw createError.NotFound(`Post not found`);
      }

      res.json({ status: 'isOkay', message: 'Post removed' });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = postController;
