const BlogPost = require("../models/blogpost");
const Product = require("../models/product");
const View = require("../models/view");
const jwt = require("jsonwebtoken");

const viewsCounter = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (token) {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const userId = decoded.userId;
      const visited = await getVisitedId(req);
      if (visited.site === "homepage") {
        var view = new View({
          user: userId,
          isHomePage: true,
          ip: req.ip,
        });
        view.save();
      } else {
        const { id, site } = visited;
        var view = new View({
          user: userId,
          [site]: id,
          ip: req.ip,
        });
        view.save();
      }
    } else {
      const visited = await getVisitedId(req);
      if (visited.site === "homepage") {
        var view = new View({
          isHomePage: true,
          ip: req.ip,
        });
        view.save();
      } else {
        const { id, site } = visited;
        var view = new View({
          [site]: id,
          ip: req.ip,
        });
        view.save();
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
    const product = await Product.findOne({ slug: req.params.slug });
    return {
      site: "product",
      id: product._id,
    };
  }
  if (req.url.startsWith("/blogposts/")) {
    const blogPost = await BlogPost.findOne({ slug: req.params.slug });
    return {
      site: "blogpost",
      id: blogPost._id,
    };
  }

  return {
    site: "homepage",
  };
}

module.exports = viewsCounter;
