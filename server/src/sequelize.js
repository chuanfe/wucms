const { Sequelize } = require("sequelize");
const UserModel = require("./models/User");
const PostModel = require("./models/Post");

// Connect to database
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "mysql",
});
(async () => {
  try {
    const res = await sequelize.sync();
    console.log('数据初始化成功')
  } catch (err) {
    console.log(err);
  }
})();

const User = UserModel(sequelize);
const Post = PostModel(sequelize);

User.hasMany(Post, { foreignKey: "userId" });


module.exports = {
  User,
  Post,
};
