const express = require('express');
const router = express.Router();
const Foodtruck = require('../models/Foodtruck.model');
const uploader = require('../configs/cloudinary.config');
const { resource } = require('../app');
const Owner = require('../models/Owner.model');
const Booking = require('../models/Booking.model');
const transporter = require('../configs/nodemailer.config');

router.get('/register', (req, res) => {
  res.render('foodtruck/register', { user: req.session.currentUser, layout: "layout-user.hbs" } );
});

router.post(
  '/register',
  uploader.single('image'),
  (req, res) => {
    const {
      name,
      description,
      price,
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
    const image = req.file.path;
    Foodtruck.findOne({
      name,
    }).then((foodtruck) => {
      if (foodtruck) {
        res.render('foodtruck/register', {
          errorMessage: 'Foodtruck already registered',
          layout: "layout-user.hbs",
        });
      } else {
        Foodtruck.create({
          name,
          description,
          image,
          price,
          date: [],
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
          creator: req.session.currentUser._id,
        }).then((createdFoodtruck) => {
          Owner.updateOne({_id: req.session.currentUser._id}, {$addToSet: {foodtrucks: createdFoodtruck._id}}, {new: true})
          .then(() => {
            transporter.sendMail({
              from: "Eventruck <eventruckinfo@gmail.com",
              to: req.session.currentUser.email,
              subject: "Foodtruck added!",
              html: `<h2>Thank you for adding ${name} to you foodtrucks!</h2><p>Thank you for using our platform</p>`,
            });
            res.redirect('/private/profile-owner');
          })
        });
      }
    });
  }
);

router.post('/results', (req, res) => {
  const { type, specialty, price, date } = req.body;
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
  filterObject.date = { $nin: [date] };
  req.session.resultsDate = date;

  Foodtruck.find(filterObject)
    .then((results) => {
      if(req.session.currentUser && req.session.currentUser._id){
        res.render('foodtruck/foodtruck-list', { user: req.session.currentUser, foodtrucks: results, layout: "layout-user.hbs" });
      } else {
        res.render('foodtruck/foodtruck-list', { foodtrucks: results });
      }
    })
    .catch((error) => console.error(error));
});

router.post('/:id/delete', (req, res) => {
  const { id } = req.params;
  Foodtruck.findByIdAndDelete({_id: id})
    .then(() => {
      res.redirect('/private/profile-owner');
    })
    .catch((error) => console.error(error));
});

router.get('/:id/edit', (req, res) => {
  const { id } = req.params;
  Foodtruck.findById(id)
    .then((foodtruck) => { 
      res.render('foodtruck/foodtruck-edit', { user: req.session.currentUser, foodtruck, layout: "layout-user.hbs" })})
    .catch((error) => console.error(error));
});

router.post('/:id/edit', uploader.single('image'), (req, res) => {
  const { id } = req.params;
  let { name, description, price } = req.body;
  const image = req.file.path;
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
    image,
    price,
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

router.post('/:id/book', (req, res) => {
  const { id } = req.params;
  Foodtruck.updateOne({_id: id}, {$addToSet: {date: req.session.resultsDate}}, {new: true})
  .then(() => {
    Booking.create({
      client: req.session.currentUser._id,
      foodtruck: id,
      date: req.session.resultsDate,
      bookingDate: Date.now(),
    })
    .then((reservation) => {
      res.redirect('/private/profile');
      transporter.sendMail({
        from: "Contact <eventruckinfo@gmail.com",
        to: req.session.currentUser.email,
        subject: "Booking confirmation, Eventruck.",
        html: `<h2>You have booked a Foodtruck</h2><p>Thank you for using our platform. Eventruck.</p>`,
      });
    })
    .catch((error) => console.error(error));
  })
  .catch((error) => console.error(error));
})

router.get('/:id', (req, res) => {
  const { id } = req.params;
  Foodtruck.findById({ _id: id })
    .then((foodtruck) => {
      if(req.session.currentUser && req.session.currentUser._id){
        res.render('foodtruck/foodtruck-details', { user: req.session.currentUser, foodtruck, layout: "layout-user.hbs" });
      } else {
        res.render('foodtruck/foodtruck-details', { foodtruck });
      }
    })
    .catch((error) => console.error(error));
});

module.exports = router;
