const { slugify, initCloudinary } = require("../helpers");
const BlogPost = require("../models/blogpost");

const index = async (req, res) => {
  const blogPosts = await BlogPost.find({});
  try {
    res.send(blogPosts);
  } catch (e) {
    res.status(500).send(e);
  }
};

const show = async (req, res) => {
  const blogPost = await BlogPost.findOne({ slug: req.params.slug });
  try {
    res.send(blogPost);
  } catch (e) {
    res.status(500).send(e);
  }
};

const create = async (req, res) => {
  const cloudinary = initCloudinary();
  try {
    const response = await cloudinary.uploader.upload(req.file.path, {
      public_id: slugify(req.body.title),
    });
    const blogPost = new BlogPost({
      ...req.body,
      slug: slugify(req.body.title),
      image: response.secure_url,
      body: JSON.parse(req.body.body),
    });

    await blogPost.save();
    res.send({ message: "Blog post created.", blogPost: blogPost });
  } catch (e) {
    if (e.code) {
      res.status(500).send("hey");
    }
    res.status(500).send("hey2");
  }
};

module.exports = { index, show, create };
