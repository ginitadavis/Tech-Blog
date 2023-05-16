const router = require('express').Router();
const { async } = require('radar-sdk-js');
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
const { findAll } = require('../models/User');

router.get('/', async (req, res) => {
  try {
    // Get all blogs and JOIN with user data
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'user_name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    console.log('**************************');
    console.log(blogs);
    // Pass serialized data and session flag into template
    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in,
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blog/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          include: User,
        },
        {
          model: User,
          attributes: ['user_name'],
        },
      ],



      // include: [
      //   Comment,
      //   {
      //     model: User,
      //     attributes: ['user_name'],
      //   },
      // ],
    });

    const blog = blogData.get({ plain: true });
    console.log("BLOGG!!! ", blog)
    res.render('blog', {
      ...blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  try {
    if (req.session.logged_in) {
      res.redirect('dashboard');
      return;
    }
    res.render('login');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', /*withAuth ,*/ async (req, res) => {
  try {

    const userId = req.session.user_id;
    console.log("USER ID! ", userId)
    const userData = await User.findOne({
      where: { id: userId },
      include: {
        model: Blog,
        foreignKey: 'user_id'
      },
    })

    // const userData = await User.findByPk(req.session.user_id, {
    //   attributes: { exclude: ['userPassword']},
    //   include: [{ model: Blog}],
    // });

    const posts = userData.get({ plain: true });

    res.render('dashboard', {
      posts,
      logged_in: true
    });
    console.log(posts);
    console.log(posts.firstName);
    // res.status(200).json(userData);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

});



module.exports = router;
