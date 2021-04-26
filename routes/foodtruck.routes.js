const express = require('express');
const router = express.Router();
const Foodtruck = require('../models/Foodtruck.model')
const uploader = require("../configs/cloudinary.config");

router.get('/register', (req, res) => {
  res.render('foodtruck/register')
});

router.post('/register', uploader.fields([{ name: 'image', maxCount: 5 }]), (req, res) => {
  const {
    name,
    description,
    images,
    price,
    date,
    availability,
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
    dessert,
  } = req.body;
  Foodtruck.findOne({
      name
    })
    .then(foodtruck => {
      if (foodtruck) {
        res.render('foodtruck/register', {
          errorMessage: 'Foodtruck already registered'
        })
      } else {
        Foodtruck.create({
            name,
            description,
            images,
            price,
            date,
            availability,
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
            dessert: !!dessert,
          })
          .then(() => {
            res.redirect('/')
          })
      }
    })
})

module.exports = router;