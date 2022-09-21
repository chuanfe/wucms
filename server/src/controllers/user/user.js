const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const { User } = require("../../sequelize");
const { addUserValidation } = require("../../utils/validation");
const { signJwt } = require("../../authorization");
const upload = require("../upload");

module.exports = {
  addUser: async (req, res) => {
    console.log("addUser", req.body);
    const validation = addUserValidation(req.body);
    if (validation.error)
      return res.status(400).json({ errors: validation.error.details });
    try {
      let saltRounds = 10;
      const hash = await bcrypt.hash(req.body.password, saltRounds);
      req.body.password = hash;

      const user = await User.create(req.body);

      const token = signJwt({
        user: {
          id: user.id,
        },
      });
      return res.status(200).json({
        user: {
          id: user.id,
          username: user.username,
          avatar: user.avatar,
          token,
        },
      });
    } catch (err) {
      return res.status(400).json({ errors: err });
    }
  },
  editUser: async (req, res) => {
    const avatar = req.files.avatar ? req.files.avatar[0] : null;
    Promise.all([upload(avatar, "image"), upload(cover, "image")]).then(
      async (photos) => {
        const obj = {};
        if (photos[0].secure_url) obj.avatar = photos[0].secure_url;
        if (photos[1].secure_url) obj.cover = photos[1].secure_url;
        try {
          const user = await User.update(obj, {
            where: { id: req.body.userId },
          });
          return res.status(200).json({ user: obj });
        } catch (error) {
          return res.status(400).json({ errors: error });
        }
      }
    );
  },
  loginUser: async (req, res) => {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ username: req.body.user }, { email: req.body.user }],
      },
      raw: true,
    });
    if (!user)
      return res.status(401).json({ user: "Incorrect username/email" });

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return res.status(401).json({ password: "Incorrect password" });

    const token = signJwt({
      user: {
        id: user.id,
      },
    });
    return res.status(200).json({
      user: {
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        token,
      },
    });
  },
};
