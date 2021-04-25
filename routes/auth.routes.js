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
    food,
    drinks,
    bagels,
    sandwiches,
    burritos,
    crepes,
    hamburgers,
    pizza,
    sushi,
    smoothies,
    tea,
    coffee,
    beer,
    cocktails,
    iceCream,
    cakes,
    dessert
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
            food: !!food,
            drinks: !!drinks,
            bagels: !!bagels,
            sandwiches: !!sandwiches,
            burritos: !!burritos,
            crepes: !!crepes,
            hamburgers: !!hamburgers,
            pizza: !!pizza,
            sushi: !!sushi,
            smoothies: !!smoothies,
            tea: !!tea,
            coffee: !!coffee,
            beer: !!beer,
            cocktails: !!cocktails,
            iceCream: !!iceCream,
            cakes: !!cakes,
            dessert: !!dessert
          })
          .then(() => {
            res.redirect('/private/profile')
          })
      }

    })

})

router.get('/owner', (req, res) => {
  res.render('signup/owner')
})

router.post('owner', (req, res) => {
  const {
    username,
    email,
    password,
    image,
    NIF,
    mobilephone
  } = req.body;
  Owner.findOne({
    username
  })
  .then(owner => {
    if (owner) {
      res.render('signup/owner', {
        errorMessage: 'User already exists'
      })} else {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPass = bcrypt.hashSync(password, salt);
        Owner.create({
          username,
          email,
          password,
          image,
          NIF,
          mobilephone
        })
        .then(() => {
          res.redirect('/private/profile')
        })
      }
    })
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


router.post('/login', (req, res) => {
  const {
    email,
    password
  } = req.body;

  if (!email || !password) {
    res.render('login', {
      errorMessage: 'Email and password are required'
    });
  }

  Client.findOne({
      email
    })
    .then(user => {
      if (!user) {
        res.render('login', {
          errorMessage: 'Incorrect email or password'
        });
      }

      const passwordCorrect = bcrypt.compareSync(password, user.password);
      if (passwordCorrect) {
        req.session.currentUser = user;
        res.redirect('/private/profile')
      } else {
        res.render('login', {
          errorMessage: 'Incorrect email or password'
        });
      }
    })
})

module.exports = router;