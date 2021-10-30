const Comments = require("../models/commentModel");
const Posts = require("../models/postModel");

const commentCtrl = {
  createComment: async (req, res) => {
    try {
      const { postId, content, tag, reply } = req.body;

      const newComment = new Comments({
        user: req.user._id,
        content,
        tag,
        reply,
      });

      await Posts.findOneAndUpdate(
        { _id: postId },
        {
          $push: { comments: newComment._id },
        },
        { new: true }
      );

      await newComment.save();

      res.json({ newComment });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateComment: async (req, res) => {
    try {
      const { content } = req.body;

      await Comments.findOneAndUpdate(
        { _id: req.params.id, user: req.user._id },
        { content }
      );

      res.json({ msg: "Update Success!" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  likeComment: async (req, res) => {
    try {
      const comment = await Comments({
        _id: req.params.id,
        likes: req.user._id,
      });
      if (comment.length > 0)
        return res.status(500).json({ msg: "You likes this comment" });

      await Comments.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { likes: req.user._id },
        }
      );

      res.json({ msg: "Like Comment!" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  unlikeComment: async (req, res) => {
    try {
      await Comments.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { likes: req.user._id },
        }
      );

      res.json({ msg: "UnLike Comment!" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = commentCtrl;
