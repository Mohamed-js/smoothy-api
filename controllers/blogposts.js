const { imageUrlFormatter, slugify } = require("../helpers");
const BlogPost = require("../models/blogpost");

const index = async (req, res) => {
  const blogPosts = await BlogPost.find({});
  try {
    res.send(blogPosts);
  } catch (error) {
    res.status(500).send(error);
  }
};

const show = async (req, res, next) => {
  const blogPosts = await BlogPost.findById(req.params.id);
  try {
    res.send(blogPosts);
  } catch (error) {
    res.status(500).send(error);
  }
};

const create = async (req, res) => {
  try {
    const blogPost = new BlogPost({
      ...req.body,
      slug: slugify(req.body.title),
      image: imageUrlFormatter(req),
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
