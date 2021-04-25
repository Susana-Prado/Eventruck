const express = require('express');
const Client = require('../models/client-model');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/', (req, res) => {
  res.render('signup');
});

router.get('/client', (req, res) => {
  res.render('signup/client');
});

router.post('/client', (req, res) => {
  const {
    username,
    email,
    password,
    image,
    preferences
  } = req.body;
  Client.findOne({
      username
    })
    .then(client => {
      if (client) {
        res.render('signup/client', {
          errorMessage: 'User already exists'
        })
      } else {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPass = bcrypt.hashSync(password, salt);
        Client.create({
            username,
            email,
            password: hashPass,
            image,
            preferences
          })
          .then(() => {
            res.redirect('/')
          })
      }

    })

})

router.get('/owner', (req, res) => {
  res.render('signup/owner')
})

module.exports = router;