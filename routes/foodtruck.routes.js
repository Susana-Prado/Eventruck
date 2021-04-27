const express = require('express');
const router = express.Router();
const Foodtruck = require('../models/Foodtruck.model')
const uploader = require('../configs/cloudinary.config');

router.get('/register', (req, res) => {
  res.render('foodtruck/register');
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
    any
  } = req.body;
  Foodtruck.findOne({
    name,
  }).then((foodtruck) => {
    if (foodtruck) {
      res.render('foodtruck/register', {
        errorMessage: 'Foodtruck already registered',
      });
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
        any: !!any,
      }).then(() => {
        res.redirect('/');
      });
    }
  });
});

// router.get('/results', (req, res) => {
//   res.render('foodtruck/foodtruck-list');
// });

router.post('/results', (req, res) =>{
  const {type, specialty, price, date} = req.body;
  console.log(type, specialty, price, date)
  const filterObject = {};
  if (type !== 'any') {
    filterObject[type] = true;
  }
  if (specialty !== 'any') {
    filterObject[specialty] = true;
  }
  if (price !== 'any') {
    if (price.indexOf('+') > -1) {
      filterObject.price = { $gte: parseInt(price) };
    } else {
      const lowerPrice = parseInt(price.split('-')[0]);
      const higherPrice = parseInt(price.split('-')[1]);
      filterObject.price = { $gte: lowerPrice, $lte: higherPrice };
    }
  }
  Foodtruck.find(filterObject)
  .then((results) =>{
    console.log(results);
    res.render('foodtruck/foodtruck-list', {foodtrucks: results});
  })
  .catch(error => console.error(error))
});

// router.get('/:id', (req, res) => {
//   const { id } = req.params;
//   Foodtruck.findById({ _id: id })
//   .then((foodtruck) => res.render("foodtruck/foodtruck-details", foodtruck))
//   .catch((error) => next(error))
// })

module.exports = router;
