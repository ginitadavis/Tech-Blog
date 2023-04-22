const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    comment_text: {
      type: DataTypes.TEXT,
    }
  },
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: false,
    modelName: 'comment',
  },
);


module.exports = Comment;