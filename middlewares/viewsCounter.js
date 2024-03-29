// const { BlogPost } = require("../models/blogpost");
const { Product } = require("../models/schema");
const { View } = require("../models/schema");
const jwt = require("jsonwebtoken");

const viewsCounter = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (token) {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const userId = decoded.userId;
      const visited = await getVisitedId(req);
      if (visited) {
        if (visited.site === "homepage") {
          await View.create({
            UserId: userId,
            isHomePage: true,
            ip: req.ip,
          });
        } else {
          const { id, site } = visited;
          await View.create({
            UserId: userId,
            [site]: id,
            ip: req.ip,
          });
        }
      }
    }

    next();
  } catch (e) {
    console.log(e);
    next();
  }
};

async function getVisitedId(req) {
  if (req.url.startsWith("/products/")) {
    const product = await Product.findOne({ where: { slug: req.params.slug } });

    if (product)
      return {
        site: "ProductId",
        id: product.id,
      };
  }
  // if (req.url.startsWith("/blogposts/")) {
  //   const blogPost = await BlogPost.findOne({
  //     where: { slug: req.params.slug },
  //   });
  //   if (blogPost)
  //     return {
  //       site: "blogpost",
  //       id: blogPost._id,
  //     };
  // }

  // return {
  //   site: "homepage",
  // };
}

module.exports = viewsCounter;
