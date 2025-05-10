const { DataTypes } = require("sequelize");
const sequelize = require("../configs/dbConfig");

const Banner = sequelize.define(
  "Banner",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageURL: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive", "deleted"),
      defaultValue: "active",
    },
    shopId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "banners",
    timestamps: true,
  }
);

module.exports = Banner;
