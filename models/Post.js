const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {
//   static like(body, models) {
//     return models.Like.create({
//       user_id: body.user.id,
//       post_id: body.post_id
//     }).then(() => {
//       return Post.findOne({
//         where: {
//           id: body.post_id
//         },
//         attributes: [
//           'id',
//           'title',
//           'blog_text',
//           'created_at'
//         ],
//         include: [
//           {
//             model: models.comment,
//             attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//             include: {
//               model: models.User,
//               attributes: ['username']
//             }
//           }
//         ]
//       })
//     })
//   }
}
Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    blog_text: {
      type: DataTypes.STRING,
      allowNull: false
      // validate: {
      //   len: {
      //     args: [10, 300]
      //   }
      //}
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
  }
);



module.exports = Post;