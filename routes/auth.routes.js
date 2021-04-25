const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Client = require('../models/Client.model');
const Owner = require('../models/Owner.model');

router.get('/client', (req, res) => {
  res.render('signup/client')
});

router.get('/owner', (req, res) => {
  res.render('signup/owner')
});

router.get('/login', (req, res) => {
  res.render('login');
});


router.post('/login', (req, res) =>{
  const { email, password } = req.body;

  if(!email || !password){
    res.render('login', { errorMessage: 'Email and password are required'});
  }

  User.findOne({ email })
  .then(user => {
    if(!user){
      res.render('login', { errorMessage: 'Incorrect email or password'});
    }

    const passwordCorrect = bcrypt.compareSync(password, user.password);
    if(passwordCorrect){
      req.session.currentUser = user;
      res.redirect('/private/profile')
    } else {
      res.render('login', { errorMessage: 'Incorrect email or password'});
    }
  })
})


module.exports = router;