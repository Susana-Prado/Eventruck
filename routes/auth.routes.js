const express = require('express');
const router = express.Router();
const Client = require('../models/Client.model');
const Owner = require('../models/Owner.model');
const bcrypt = require('bcryptjs');
const uploader = require('../configs/cloudinary.config');
const transporter = require('../configs/nodemailer.config');
const saltRounds = 10;

router.get('/', (req, res) => {
  res.render('signup');
});

router.get('/client', (req, res) => {
  res.render('signup/client');
});

router.post('/client', uploader.single('image'), (req, res) => {
  const {
    username,
    email,
    password,
    image
  } = req.body;
  Client.findOne({
    username,
  }).then((client) => {
    if (client) {
      res.render('signup/client', {
        errorMessage: 'User already exists',
      });
    } else {
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashPass = bcrypt.hashSync(password, salt);
      Client.create({
        username,
        email,
        password: hashPass,
        image
      }).then((user) => {
        req.session.currentUser = user;
        transporter.sendMail({
          from: "Contact <eventruckinfo@gmail.com",
          to: email,
          subject: "Welcome to Eventruck!",
          html: `<h2>Welcome to Eventruck, ${username}!</h2><p>Thank you for using our platform</p>`,
        })
        .then(() => {
          res.redirect('/private/profile');
        })
        .catch(error => {
          res.redirect('/private/profile');
        })
      });
    }
  });
});

router.get('/owner', (req, res) => {
  res.render('signup/owner');
});

router.post('/owner', uploader.single('image'), (req, res) => {
  const { username, email, password, image, NIF, mobilephone } = req.body;
  Owner.findOne({
    username,
  }).then((owner) => {
    if (owner) {
      res.render('signup/owner', {
        errorMessage: 'User already exists',
      });
    } else {
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashPass = bcrypt.hashSync(password, salt);
      Owner.create({
        username,
        email,
        password: hashPass,
        image,
        NIF,
        mobilephone,
      }).then((user) => {
        req.session.currentUser = user;
        res.redirect('/private/profile-owner');
      });
    }
  });
});

router.get('/login', (req, res) => {
  if (req.session.currentUser && req.session.currentUser._id) {
    if (req.session.currentUser.NIF) {
      res.redirect('/private/profile-owner');
    } else {
      res.redirect('/private/profile');
    }
  } else {
    res.render('login');
  }
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.render('login', {
      errorMessage: 'Email and password are required',
    });
  }

  Client.findOne({
    email,
  }).then((client) => {
    if (!client) {
      Owner.findOne({
        email,
      }).then((owner) => {
        if (!owner) {
          res.render('login', {
            errorMessage: 'Incorrect email or password',
          });
        } else {
          const passwordCorrect = bcrypt.compareSync(password, owner.password);
          if (passwordCorrect) {
            req.session.currentUser = owner;
            res.redirect('/private/profile-owner');
          } else {
            res.render('login', {
              errorMessage: 'Incorrect email or password',
            });
          }
        }
      });
    } else {
      const passwordCorrect = bcrypt.compareSync(password, client.password);
      if (passwordCorrect) {
        req.session.currentUser = client;
        res.redirect('/private/profile');
      } else {
        res.render('login', {
          errorMessage: 'Incorrect email or password',
        });
      }
    }
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.redirect('/');
    } else {
      res.redirect('/');
    }
  });
});

module.exports = router;
