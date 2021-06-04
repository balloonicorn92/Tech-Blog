const router = require('express').Router()
const sequelize = require('../../config/connection')
const isLoggedIn = require('../../utils/isLoggedIn')
const { Post, User, Comment } = require('../../models')

//find all posts -- to display on home page -- tested -- working 
//This is for the homepage page with all blogs created by user, main page with all blogs from all users (logged in and not logged in)
router.get('/', (req, res) => {
    //create and add user_id 
    Post.findAll({
        attributes: [
            'id',
            'title',
            'blog_text',
            'created_at'
        ],
        order: [['created_at', 'DESC']],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
    }).then(blogData => res.json(blogData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})
//find post by id -- tested -- working
//This is for the comment page
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'blog_text',
            'created_at'
        ],
        include: [
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
              model: User,
              attributes: ['username']
            }
          },
          {
            model: User,
            attributes: ['username']
          }
        ]
    }).then(postData => {
        if (!postData) {
            res.status(404).json({ message: 'No user found with this ID number' })
            return
        }
        res.json(postData)
    }).catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
})

//create a new post -- tested-- working
//this is for logged in homepage
router.post('/', isLoggedIn, (req, res) => {
    Post.create({
        title: req.body.title,
        blog_text: req.body.blog_text,
        user_id: req.session.user_id
    }).then(blogData => res.json(blogData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})
// router.put('/', isLoggedIn, (req, res) => {
//     //make sure the session exist first
//     if (req.session) {
//     // custom static method created in models/Post.js
//     Post.like({...req.body, user_id: req.session.user_id} , { Like, Comment, User })
//       .then(updatedLikeData => res.json(updatedLikeData))
//       .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//     };
//   });

  router.put('/:id', isLoggedIn, (req, res) => {
    Post.update(
      {
        title: req.body.title
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(postData => {
        if (!postData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(postData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
//delete a post --tested --- working
//this is for logged in homepage
router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(postData => {
            if (!postData) {
                res.status(404).json({ message: 'No user found with this ID number' })
                return
            }
            res.json(postData)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

module.exports = router