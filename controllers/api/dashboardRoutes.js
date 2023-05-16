// const router = require('express').Router();
// const { User, Blog } = require('../../models');
// const withAuth = require('../../utils/auth');

// // Use withAuth middleware to prevent access to route
// router.get('/', withAuth, async (req, res) => {
//     try{

//         res.redirect('/api/dashboard');
//     //   const userData = await User.findByPk(req.session.user_id, {
//     //     attributes : {exclude: ['userPassword']},
//     //     include: [{ model: Blog}],
//     //   });

//     //   const user = userData.get({ plain: true });

//     //   console.log('-----------------------------------');
//     //   console.log(user);
//     //   res.render('dashboard', {
//     //     ...user,
//     //     logged_in: true
//     //   });

//     //   console.log(user);

//     }catch(err){
//       res.status(500).json(err);
//     }
//   });

//   module.exports = router;