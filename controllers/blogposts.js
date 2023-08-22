const { slugify, uploadImage } = require("../helpers");
const { BlogPost, View } = require("../models/schema");

const index = async (req, res) => {
  // const views = await View.aggregate([
  //   {
  //     $match: {
  //       blogpost: { $exists: true },
  //     },
  //   },
  //   {
  //     $group: {
  //       _id: "$blogpost",
  //       viewsCount: { $sum: 1 },
  //     },
  //   },
  // ]);
  // res.send(views);
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
  try {
    const image_url = await uploadImage(req);
    const blogPost = new BlogPost({
      ...req.body,
      slug: slugify(req.body.title),
      image: image_url,
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
