const Post = require("../../models/post");

const { validationResult } = require("express-validator");


exports.listPosts = function (req, res) {

  let query = Post.find({}, ["title", "content", "author"]).exec();
  query
    .then(function (result) {
      res.json({ status: 1, posts: result });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ status: 0, data: err });
    });
};

exports.getPost = async (req, res) => {
  try {
    const postData = await Post.findById(req.params.id).exec();
    res.json({ message: "", data: postData });
  } catch (err) {
    res.status(400).json({ status: 0, data: err });
  }
};

exports.createPost = async (req, res) => {
  try {
    const errors = await validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    let postInfo = {
      title: req.body.title,
      content: req.body.content,
      author: req.body.author
    };

    Post.create(postInfo, function (err, result) {
      if (err) return res.json({ status: 0, data: { message: err.message } });
      return res.json({ status: 1, message: "Post Created.", data: result });
    });
  } catch (err) {
    res.status(400).json({ data: err });
  }
};

exports.updatePost = async function (req, res) {
  try {

    const errors = await validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    let postData = {
      title: req.body.title,
      author: req.body.author,
      content: req.body.content
    };

  
    const postUpdate = await Post.findByIdAndUpdate(
      { _id: req.params.id },
      postData,
      { new: true, upsert: true }
    );

    if (!postUpdate)
      return res.status(400).json({ status: 0, message: "Post not found" });

    res.json({ status: 1, message: "Post updated", data: { post: postUpdate } });
  } catch (err) {
    res.status(400).json({ status: false, message: "Not updated", data: err });
  }
};

exports.deletePost = async(req,res)=>{
	Post.deleteOne({ _id: req.params.id }, function (err) {
		if (err) return res.status(400).json({data:err});
		 return res.json({status:1, message: "Post Deleted", data:[]});
	  });
}



