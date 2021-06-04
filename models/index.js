// import all models
const Post = require('./Post');
const User = require('./User');
const Comment = require('./Comment');
//These are called associations

//User can have many posts ONE TO MANY
User.hasMany(Post, {
    foreignKey: 'user_id'
});
// post belongs to one user MANY TO ONE
Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});
Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});
//a post can have comments
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
});
// User can create many comments
User.hasMany(Comment, {
    foreignKey: 'user_id'
})
//a post can have many comments
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
})


module.exports = { Post, Comment, User }