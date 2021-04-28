const express = require('express');
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
  Client.findById({_id: req.session.currentUser._id})
  .then(user => {
    res.render('client/profile', { client: user });
  })
});

router.get('/profile-owner', isLoggedIn, (req, res) => {
  Owner.findById({_id: req.session.currentUser._id})
  .populate('foodtrucks')
  .then(user => {
    res.render('owner/profile-owner', { owner: user })
  })
});

router.get('/profile/edit', (req, res) => {
  Client.findById({_id: req.session.currentUser._id})
  .then(user => {
    res.render('client/client-update-form', { client: user });
  })
});

router.post('/profile/edit', (req, res) => {
  const id = req.session.currentUser._id;
  const { username, email, image } = req.body;
  Client.findByIdAndUpdate(id, {
    username,
    email,
    image,
  }, {new: true})
    .then(() => {
      res.redirect('/private/profile');
    })
    .catch((error) => console.error(error));
});

router.get('/profile-owner/edit', (req, res) => {
  Owner.findById({_id: req.session.currentUser._id})
  .populate('foodtrucks')
  .then(user => {
    res.render('owner/owner-update-form', { owner: user })
  })
});

router.post('/profile-owner/edit', (req, res) => {
  const id = req.session.currentUser._id;
  const { username, email, image, NIF, mobilephone } = req.body;
  Owner.findByIdAndUpdate(id, {
    username,
    email,
    image,
    NIF,
    mobilephone,
  }, {new: true})
    .then(() => {
      res.redirect('/private/profile-owner');
    })
    .catch((error) => console.error(error));
});

router.post('/profile/delete', (req, res) => {
  const id = req.session.currentUser._id;
  Client.findByIdAndDelete({ _id: id })
    .then(() => {
      req.session.destroy((err) => {
        if(err){
          res.redirect('/');
        } else {
          res.redirect('/');
        }
      })
    })
    .catch((error) => console.error(error));
});

router.post('/profile-owner/delete', (req, res) => {
  const id = req.session.currentUser._id;
  Owner.findByIdAndDelete({ _id: id })
    .then(() => {
      req.session.destroy((err) => {
        if(err){
          res.redirect('/');
        } else {
          res.redirect('/');
        }
      })
    })
    .catch((error) => console.error(error));
});

module.exports = router;
