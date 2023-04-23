const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all blogs and JOIN with user data
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['id','user_name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      blogs, 
      logged_in: req.session.logged_in,
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/homepage', async (req, res) => {
  try {
    // Get all blogs and JOIN with user data
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['id','user_name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

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

    console.log('********************')
    console.log(user);
    
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.email_address, {
      attributes: { exclude: ['userPassword'] },
      include: [{ model: Blog }],
    });

    const user = userData.get({ plain: true });

    console.log('********************')
    console.log(user);

    res.render('dashboard', {
      ...user,
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
    res.render('login');
  }catch(err){
    res.status(500).json(err);
  }
});

// router.post('/', async(req, res) => {
//   // If the user is already logged in, redirect the request to another route
//   try{
//     if (req.session.logged_in) {
//       res.redirect('/homepage');
//       return;
//     } else {
//       const userData = await User.create(req.body);
//       console.log("req.session");

//       console.log(req.session);
  
//       req.session.save(() => {
//         req.session.user_id = userData.id;//check if I should have userID here
//         req.session.logged_in = true;
//         res.redirect('/homepage');
  
//       });}
//   }catch(err){
//     res.status(500).json(err);
//   }
// });

// router.post('/login', async(req, res) => {
//   // If the user is already logged in, redirect the request to another route
//   try{
//     if (req.session.logged_in) {
//       res.redirect('/homepage');
//       return;
//     } else {
//       const userData = await User.create(req.body);
//       console.log("req.session");

//       console.log(req.session);
  
//       req.session.save(() => {
//         req.session.user_id = userData.id;//check if I should have userID here
//         req.session.logged_in = true;
//         res.redirect('/homepage');
  
//       });}
//   }catch(err){
//     res.status(500).json(err);
//   }
// });

router.get('*', async (req, res) => {
  try {
    // Get all blogs and JOIN with user data
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['id','user_name'],
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

module.exports = router;
