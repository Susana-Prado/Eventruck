const express = require('express');
const router = express.Router();
const Client = require('../models/Client.model');
const Owner = require('../models/Owner.model');
const bcrypt = require('bcryptjs');
const uploader = require('../configs/cloudinary.config');
const transporter = require('../configs/nodemailer.config');
const saltRounds = 10;

router.post('/client', (req, res) => {
  const { username, email, password } = req.body;

  // const image = req.file.path;

  if (password.length < 3) {
    return res.status(400).json({
      message: 'Please make your password at least 3 characters long',
    });
  }

  if (!username || !email) {
    return res
      .status(400)
      .json({ message: 'Please fill all the fields in the form' });
  }

  Client.findOne({ username }).then((client) => {
    if (client) {
      return res.status(400).json({ message: 'User already exists.' });
    } else {
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashPass = bcrypt.hashSync(password, salt);
      Client.create({ username, email, password: hashPass})
        .then((user) => {
          req.session.currentUser = user;
          transporter.sendMail({
            from: 'Contact <eventruckinfo@gmail.com',
            to: email,
            subject: 'Welcome to Eventruck!',
            html: `<h2>Welcome to Eventruck, ${username}!</h2><p>Thank you for using our platform</p>`,
          });
          return res.status(200).json(user);
        })
        .catch((error) => res.status(500).json(error));
    }
  });
});

router.post('/owner', (req, res) => {
  const { username, email, password, NIF, mobilephone } = req.body;
  // const image = req.file.path;

  if (password.length < 3) {
    return res.status(400).json({
      message: 'Please make your password at least 3 characters long',
    });
  }

  if (!username || !email) {
    return res
      .status(400)
      .json({ message: 'Please fill all the fields in the form' });
  }

  Owner.findOne({
    username,
  }).then((owner) => {
    if (owner) {
      return res
        .status(400)
        .json({ message: 'User already exists. Please change your email' });
    } else {
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashPass = bcrypt.hashSync(password, salt);
      Owner.create({
        username,
        email,
        password: hashPass,
        NIF,
        mobilephone,
      })
        .then((user) => {
          req.session.currentUser = user;
          transporter.sendMail({
            from: 'Contact <eventruckinfo@gmail.com',
            to: email,
            subject: 'Welcome to Eventruck!',
            html: `<h2>Welcome to Eventruck, ${username}!</h2><p>Thank you for using our platform</p>`,
          });
          return res.status(200).json(user);
        })
        .catch((error) => res.status(500).json(error));
    }
  });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  Client.findOne({
    email,
  }).then((client) => {
    if (!client) {
      Owner.findOne({
        email,
      }).then((owner) => {
        if (!owner) {
          return res
            .status(400)
            .json({ message: 'Incorrect email or password' });
        } else {
          const passwordCorrect = bcrypt.compareSync(password, owner.password);
          if (passwordCorrect) {
            req.session.currentUser = owner;
            return res.status(200).json(owner);
          } else {
            res.status(400).json({ message: 'Incorrect email or password' });
          }
        }
      });
    } else {
      const passwordCorrect = bcrypt.compareSync(password, client.password);
      if (passwordCorrect) {
        req.session.currentUser = client;
        return res.status(200).json(client);
      } else {
        res.status(400).json({ message: 'Incorrect email or password' });
      }
    }
  });
});

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(400).json({ message: 'Error logout' });
    } else {
      res.status(200).json({ message: 'Log out success!' });
    }
  });
});

module.exports = router;