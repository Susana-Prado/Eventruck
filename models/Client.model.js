const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
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
    required: true,
    unique: true
  },
  image: {
    type: String,
    default: "https://img2.freepng.es/20180611/cxa/kisspng-user-profile-computer-icons-avatar-5b1ef062b893c3.674439551528754274756.jpg"
  }
})

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;