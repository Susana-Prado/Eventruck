const express = require('express');
const router = express.Router();
const Foodtruck = require('../models/Foodtruck.model');
const uploader = require('../configs/cloudinary.config');
const { resource } = require('../app');
const Owner = require('../models/Owner.model');

router.get('/register', (req, res) => {
  res.render('foodtruck/register');
});

router.post(
  '/register',
  uploader.fields([{ name: 'image', maxCount: 5 }]),
  (req, res) => {
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
      any,
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
  }
);

router.post('/results', (req, res) => {
  const { type, specialty, price, date } = req.body;
  console.log(type, specialty, price, date);
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

  // if(date !== filterObject.date){
  // filterObject[availability] = true;
  // }

  Foodtruck.find(filterObject)
    .then((results) => {
      res.render('foodtruck/foodtruck-list', { foodtrucks: results });
    })
    .catch((error) => console.error(error));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  Foodtruck.findById({ _id: id })
    .then((foodtruck) => res.render('foodtruck/foodtruck-details', foodtruck))
    .catch((error) => console.error(error));
});

router.get('/:id/edit', (req, res) => {
  const { id } = req.params;
  Foodtruck.findById(id)
    .then((foodtruck) => res.render('foodtruck/foodtruck-edit', { foodtruck }))
    .catch((error) => console.error(error));
});

router.post('/:id/edit', (req, res) => {
  const { id } = req.params;
  let { name, description, images, price, date, availability } = req.body;
  const food = req.body.food ? true : false;
  const drinks = req.body.drinks ? true : false;
  const bagels = req.body.bagels ? true : false;
  const sandwiches = req.body.sandwiches ? true : false;
  const burritos = req.body.burritos ? true : false;
  const crepes = req.body.crepes ? true : false;
  const hamburgers = req.body.hamburgers ? true : false;
  const pizza = req.body.pizza ? true : false;
  const sushi = req.body.sushi ? true : false;
  const smoothies = req.body.smoothies ? true : false;
  const tea = req.body.tea ? true : false;
  const coffee = req.body.coffee ? true : false;
  const beer = req.body.beer ? true : false;
  const cocktails = req.body.cocktails ? true : false;
  const iceCream = req.body.iceCream ? true : false;
  const cakes = req.body.cakes ? true : false;
  const dessert = req.body.dessert ? true : false;

  Foodtruck.findByIdAndUpdate(id, {
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
  })
    .then(() => {
      res.redirect(`/foodtruck/${id}`);
    })
    .catch((error) => console.error(error));
});

router.post('/:id', (req, res) => {
  const { id } = req.params;
  Foodtruck.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/');
    })
    .catch((error) => console.error(error));
});



module.exports = router;
