const { Model, Datatypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blog extends Model {}

Blog.init(
    {
        id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: Datatypes.STRING,
        },
        content: {
            type: Datatypes.TEXT,
        },
        user_name: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        date_created: {
            type: Datatypes.DATEONLY,
        },
        comment: {
            type: Datatypes.comment,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'blog',
    }
);

module.exports = Blog;