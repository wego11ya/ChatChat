"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Public_Message extends Model {
    static associate(models) {
      Public_Message.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  Public_Message.init(
    {
      userId: DataTypes.INTEGER,
      message: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Public_Message",
      tableName: "Public_Messages",
      underscored: true,
    }
  );
  return Public_Message;
};
