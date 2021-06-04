const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection')
//this extends all of the Model capabilities from sequelize into my own model
class Comment extends Model {}
//create Comment model
Comment.init(
{
    id: {
        type: DataTypes.INTEGER, //ID is a number
        allowNull: false, //id canNOT be null
        primaryKey: true, //PK
        autoIncrement: true //increase by one
    },
    comment_text: {
      type: DataTypes.STRING, //comment_text is characters
      allowNull: false //can not be an empty field
      // validate: {
      //   len: [10] //has to have a length of at LEAST 10 characters (add this message to front end)
      // }
    },
    user_id: {
      type: DataTypes.INTEGER, //must be a number
      references: {
        model: 'user', //comment will come from a user_id from the user model
        key: 'id'
      }
    },
    post_id: {
      type: DataTypes.INTEGER, //must be a number
      references: {
        model: 'post', //the comment will be on a post referenced by post_id in post model
        key: 'id'
      }
    }
}, 
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
}
);



module.exports = Comment;