const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res) => {
  res.render('index');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/foodtruck-list', (req, res) => {
  res.render('foodtruck-list');
})

module.exports = router;
