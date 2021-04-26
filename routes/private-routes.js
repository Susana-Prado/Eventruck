const express = require('express');
const router = express.Router();

function isLoggedIn(req, res, next) {
  if (req.session.currentUser) next();
  else res.redirect('/auth/login');
}

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile', { client: req.session.currentUser });
});

router.get('/profile-owner', isLoggedIn, (req, res) => {
  res.render('profile-owner', { owner: req.session.currentUser });
});

module.exports = router;
