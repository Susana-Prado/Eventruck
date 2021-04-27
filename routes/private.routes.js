const express = require('express');
// const Owner = require('../models/Owner.model');
const router = express.Router();

function isLoggedIn(req, res, next) {
  if (req.session.currentUser) next();
  else res.redirect('/auth/login');
}

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile', { client: req.session.currentUser });
});

router.get('/profile-owner', isLoggedIn, (req, res) => {
  // Owner.findById({_id: req.currentsession.currentUser._id})
  // // .populate('foodtrucks')
  // .then(()=> {
  //   // foundOwner
  //   console.log(foundOwner)
    res.render('profile-owner', { owner: req.session.currentUser })
  // })
});

module.exports = router;
