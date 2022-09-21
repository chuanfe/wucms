const { Post, User} = require("../../sequelize");
const { addPostValidation } = require("../../utils/validation");
const upload = require("../upload");

module.exports = {
  addPost: async (req, res) => {
    console.log("addPost", req.body);
    const validation = addPostValidation(req.body);
    if (validation.error)
      return res.status(400).json({ errors: validation.error.details });

    upload(req.file, req.body.resource_type).then(async (media) => {
      console.log(media)
      try {
        const post = await Post.create({
          userId: req.body.userId,
          text: req.body.text,
          media: media.secure_url,
        });
        return res.status(200).json({ post });
      } catch (err) {
        return res.status(400).json({ errors: err });
      }
    });
  },
  getPosts: async (req, res) => {
    console.log("getPosts", req.query);
    const { category } = req.query;
    const posts = await User.findAll({
        attributes: [
          "id",
          "title",
          "content",
          "summary",
          "category",
          "thumbnail",
          "viewsCount",
        ],
        include: {
          model: Post,
          as: "Posts",
          required: true,
          attributes: [],
          where: {
            category: category,
          },
        },
        raw: true,
      });
      return posts;
  },
  removePost: async (req, res) => {
    console.log("removePost", req.body);
    const { postId } = req.body;
    Promise.all([
      await Post.destroy({ where: { id: postId } }),
    ]).then((values) => {
      return res.status(200).json({ post: values[0] });
    });
  },
};
