const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils/auth');

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