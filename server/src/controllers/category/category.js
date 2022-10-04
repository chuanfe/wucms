const { Category } = require("../../sequelize");
const { addCategoryValidation } = require("../../utils/validation");
// const upload = require("../upload");

module.exports = {
  addCategory: async (req, res) => {
    console.log("addCategory", req.body);
    const validation = addCategoryValidation(req.body);
    if (validation.error)
      return res.status(400).json({ errors: validation.error.details });

    // upload(req).then(async (image) => {
    //   console.log('upload done', image)
      try {
        const post = await Category.create({
          key: req.body.key,
          parentKey: req.body.parentKey,
          title: req.body.title,
          image: req.body.image,
        });
        return res.status(200).json({ post });
      } catch (err) {
        return res.status(400).json({ errors: err });
      }
    // });
  },
  getCategories: async (req, res) => {
    console.log("getCategories", req.query);
    const categories = await Category.findAll({
        attributes: [
          "id",
          "title",
          "key",
          "image"
        ],
        include: {
          model: Category,
          as: "Categories",
          required: true,
          attributes: [],
        },
        raw: true,
      });
      return categories;
  },
  removeCategory: async (req, res) => {
    console.log("removeCategory", req.body);
    const { id } = req.body;
    Promise.all([
      await Category.destroy({ where: { id } }),
    ]).then((values) => {
      return res.status(200).json({ category: values[0] });
    });
  },
};
