const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/homepage', async (req, res) => {
  try {
    // Get all blogs and JOIN with user data
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['user_name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    console.log('COOOOOOOMEEEEEEES HERE');
    console.log(blogs);

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      blogs, 
      logged_in: req.session.logged_in,
    });
    console.log(blogs.title);
    console.log(blogs.user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blog/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['user_name'],
        },
      ],
    });

    const blog = blogData.get({ plain: true });

    res.render('blog', {
      ...blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {

    const userBlog = await Blog.findAll({
      where: {
        user_id: req.session.user_id
      },
      raw: true
    });

    const user = await User.findByPk(req.session.user_id, {raw: true});
    let userName = user.user_name;

    // Find the logged in user based on the session ID
    // const userData = await User.findByPk(req.session.user_id, {
    //   attributes: { exclude: ['password'] },
    //   include: [{ model: Blog }],
    // });

    // const user = userData.get({ plain: true });

    console.log(userBlog);
    console.log(userName);
    console.log(logged_in);

    res.render('dashboard', {
      userBlog,
      userName,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  try{
    if (req.session.logged_in) {
      res.redirect('/dashboard');
      return;
    }
    res.render('login', { logged_in: req.session.logged_in });
  }catch(err){
    res.status(500).json(err);
  }
});

router.get('/register', async(req, res) => {
  // If the user is already logged in, redirect the request to another route
  try{
    if (req.session.logged_in) {
      res.redirect('/homepage');
      return;
    } else {
      const userData = await User.create(req.body);
      console.log("req.session");

      console.log(req.session);
  
      req.session.save(() => {
        req.session.user_id = userData.userID;//check if I should have userID here
        req.session.logged_in = true;
        res.redirect('/homepage');
  
      });}
  }catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;
