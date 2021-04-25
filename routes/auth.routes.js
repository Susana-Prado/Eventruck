const express = require('express');
const router = express.Router();
const Client = require('../models/Client.model');
const Owner = require('../models/Owner.model');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

router.get('/', (req, res) => {
  res.render('signup');
});

router.get('/client', (req, res) => {
  res.render('signup/client');
});

router.post('/client', (req, res) => {
  console.log(req.body);
  const {
    username,
    email,
    password,
    image,
    vegan,
    vegetarian,
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
            vegan: !!vegan,
            vegetarian: !!vegetarian,
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

  Client.findOne({ email })
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