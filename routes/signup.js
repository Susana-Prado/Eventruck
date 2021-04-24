const express = require('express');
const router = express.Router;

router.get('/client', (req, res) => {
  res.render('signup/client')
})