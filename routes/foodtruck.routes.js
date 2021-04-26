const express = require('express');
const router = express.Router();
const Foodtruck = require('../models/Foodtruck.model')

router.get('/register', (req, res) => {
  res.render('foodtruck/register')
});

router.post('/foodtruck/register', (req, res) => {
  const {
    name,
    description,
    images,
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
    dessert
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
            dessert: !!dessert
          })
          .then(() => {
            res.redirect('/foodtruck/register')
          })
      }
    })
})

module.exports = router;