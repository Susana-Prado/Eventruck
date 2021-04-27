const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  image: {type: String, default: "https://img2.freepng.es/20180611/cxa/kisspng-user-profile-computer-icons-avatar-5b1ef062b893c3.674439551528754274756.jpg"},
  food: {type: Boolean, default: false},
  drinks: {type: Boolean, default: false},
  coffee: {type: Boolean, default: false}, 
  bagels: {type: Boolean, default: false},
  sandwiches: {type: Boolean, default: false},
  burritos: {type: Boolean, default: false},
  crepes: {type: Boolean, default: false},
  hamburgers: {type: Boolean, default: false},
  pizza: {type: Boolean, default: false},
  sushi: {type: Boolean, default: false},
  smoothies: {type: Boolean, default: false},
  tea: {type: Boolean, default: false},
  beer: {type: Boolean, default: false},
  cocktails: {type: Boolean, default: false},
  iceCream: {type: Boolean, default: false},
  cakes: {type: Boolean, default: false},
  dessert: {type: Boolean, default: false},
  // reservations: [{type: mongoose.Schema.Types.ObjectId,
  //                ref: 'Foodtruck'}]
})

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;