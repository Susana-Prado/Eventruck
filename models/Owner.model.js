const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ownerSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: "https://img2.freepng.es/20180611/cxa/kisspng-user-profile-computer-icons-avatar-5b1ef062b893c3.674439551528754274756.jpg"
  },
  NIF: {
    type: String,
    required: true,
    unique: true
  },
  mobilephone: {
    type: Number,
    required: true,
    unique: true
  },
  foodtrucks: [{
    type: Schema.Types.ObjectId,
    ref: 'Foodtruck'
  }]
})

const Owner = mongoose.model('Owner', ownerSchema);

module.exports = Owner;