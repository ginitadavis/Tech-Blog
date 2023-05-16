const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/homepage', withAuth ,async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.firstName = userData.firstName;
      req.session.lastName = userData.lastName;
      req.session.user_name = userData.user_name;
      req.session.email_address = userData.email_address;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {

    const userData = await User.findOne({ where: { email_address: req.body.email_address } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }
    console.log("Found user");
    const validPassword = await userData.checkPassword(req.body.userPassword);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    console.log("Valid password");
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.firstName = userData.firstName;
      req.session.lastName = userData.lastName;
      req.session.user_name = userData.user_name;
      req.session.logged_in = true;
      res.json({ user: userData, message: 'You are now logged in!' });
      console.log("You are now logged in!");
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', async(req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }

});

module.exports = router;
