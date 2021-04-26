const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res) => {
  res.render('index');
});

router.get('/foodtruck-list', (req, res) => {
  res.render('foodtruck-list');
});

router.get('/profile', (req, res) => {
  res.render('profile', { user: req.user })
})

module.exports = router;
