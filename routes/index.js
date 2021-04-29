const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res) => {
    res.render('index', { user: req.user, layout: "layout-user.hbs"});
});

// router.get('/foodtruck-list', (req, res) => {
//   if(req.session.currentUser && req.session.currentUser._id){
//     res.render('foodtruck-list', {layout: "layout-user.hbs"});
//   } else {
//     res.render('foodtruck-list');
//   }
// });

router.get('/profile', (req, res) => {
  res.render('client/profile', { user: req.user, layout: "layout-user.hbs"})
})

module.exports = router;
