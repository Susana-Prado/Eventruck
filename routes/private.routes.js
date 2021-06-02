const express = require('express');
const router = express.Router();
const Client = require('../models/Client.model');
const Owner = require('../models/Owner.model');
const bcrypt = require('bcryptjs');
const Booking = require('../models/Booking.model');
const uploader = require('../configs/cloudinary.config');
const saltRounds = 10;

function DDMMYYYY(date) {
  const d = new Date(date);
  return `${date.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}

function isLoggedIn(req, res, next) {
  if (req.session.currentUser) next();
}

router.get('/profile', isLoggedIn, (req, res) => {
  Client.findById({ _id: req.session.currentUser._id })
    .then((user) => {
      Booking.find({ client: req.session.currentUser._id })
        .populate('foodtruck')
        .then((bookings) => {
          const formatBookings = bookings.map((item) => ({
            foodtruck: item.foodtruck,
            date: DDMMYYYY(item.date),
            bookingDate: DDMMYYYY(item.bookingDate),
          }));
          res.status(200).json(user, { bookings: formatBookings });
        })
        .catch((error) => res.status(500).json(error));
    })
    .catch((error) => res.status(500).json(error));
});

router.get('/profile-owner', isLoggedIn, (req, res) => {
  Owner.findById({ _id: req.session.currentUser._id })
    .populate('foodtrucks')
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(() => {
      return res.status(400).json();
    });
});

router.put('/profile/edit', uploader.single('image'), (req, res) => {
  const id = req.session.currentUser._id;
  const { username, email } = req.body;
  const image = req.file.path;
  Client.findByIdAndUpdate(
    id,
    {
      username,
      email,
      image,
    },
    { new: true }
  )
    .then((updatedUser) => {
      res.status(200).json(updatedUser);
    })
    .catch(() => {
      return res.status(400).json();
    });
});

router.put('/profile-owner/edit', uploader.single('image'), (req, res) => {
  const id = req.session.currentUser._id;
  const { username, email, NIF, mobilephone } = req.body;
  const image = req.file.path;
  Owner.findByIdAndUpdate(
    id,
    {
      username,
      email,
      image,
      NIF,
      mobilephone,
    },
    { new: true }
  )
    .then((updatedUser) => {
      res.status(200).json(updatedUser);
    })
    .catch((error) => console.error(error));
});

router.delete('/profile/delete', (req, res) => {
  const id = req.session.currentUser._id;
  Client.findByIdAndDelete({ _id: id })
    .then(() => {
      req.session.destroy((err) => {
        if (err) {
          res.status(400).json({ message: 'Error deleting profile' });
        } else {
          res.status(200).json({ message: 'User deleted' });
        }
      });
    })
    .catch((error) => console.error(error));
});

router.delete('/profile-owner/delete', (req, res) => {
  const id = req.session.currentUser._id;
  Owner.findByIdAndDelete({ _id: id })
    .then(() => {
      req.session.destroy((err) => {
        if (err) {
          res.status(400).json({ message: 'Error deleting profile' });
        } else {
          res.status(200).json({ message: 'User deleted' });
        }
      });
    })
    .catch((error) => console.error(error));
});

module.exports = router;
