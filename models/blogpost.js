const mongoose = require("mongoose");

const BlogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      lowercase: true,
      minlength: [5, "Blog Post name must not be less than 3 characters."],
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      minlength: [5, "Blog Post name must not be less than 3 characters."],
    },
    image: {
      type: String,
    },
    description: {
      type: String,
      required: true,
      minlength: [
        5,
        "Blog Post description must not be less than 3 characters.",
      ],
    },
    body: [
      {
        image: String,
        title: String,
        body: String,
      },
    ],
  },
  { timestamps: true }
);

const BlogPost = mongoose.model("BlogPost", BlogPostSchema);

module.exports = BlogPost;
