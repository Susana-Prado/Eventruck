const express = require('express');
// const Owner = require('../models/Owner.model');
const router = express.Router();
const Client = require('../models/Client.model');
const Owner = require('../models/Owner.model');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

function isLoggedIn(req, res, next) {
  if (req.session.currentUser) next();
  else res.redirect('/auth/login');
}

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('client/profile', { client: req.session.currentUser });
});

router.get('/profile-owner', isLoggedIn, (req, res) => {
  Owner.findById({_id: req.session.currentUser._id}).populate('foodtrucks').then((user) => {
    console.log(user)
    res.render('profile-owner', { owner: user })
  })
});

router.get('/profile/edit', (req, res) => {
  res.render('client/client-update-form', { client: req.session.currentUser });
});

router.post('/profile/edit', (req, res) => {
  const id = req.session.currentUser._id;
  const { username, email, password, image } = req.body;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashPassword = bcrypt.hashSync(password, salt);

  Client.findByIdAndUpdate(id, {
    username,
    email,
    password: hashPassword,
    image,
  })
    .then(() => {
      res.redirect('/private/profile');
    })
    .catch((error) => console.error(error));
});

router.get('/profile-owner/edit', (req, res) => {
  res.render('owner/owner-update-form', { owner: req.session.currentUser });
});

router.post('/profile-owner/edit', (req, res) => {
  const id = req.session.currentUser._id;
  const { username, email, password, image, NIF, mobilephone } = req.body;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashPss = bcrypt.hashSync(password, salt);

  Owner.findByIdAndUpdate(id, {
    username,
    email,
    password: hashPss,
    image,
    NIF,
    mobilephone,
  })
    .then(() => {
      res.redirect('/private/profile-owner');
    })
    .catch((error) => console.error(error));
});

router.post('/profile', (req, res) => {
  const id = req.session.currentUser._id;

  Client.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/');
    })
    .catch((error) => console.error(error));
});

router.post('/profile-owner', (req, res) => {
  const id = req.session.currentUser._id;

  Owner.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/');
    })
    .catch((error) => console.error(error));
});

module.exports = router;
