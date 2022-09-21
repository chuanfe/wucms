const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Post", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'other'
    },
    image: {
      type: DataTypes.STRING,
    },
    thumbnail: {
      type: DataTypes.STRING,
    },
    viewsCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });
};
