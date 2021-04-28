const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  client: {
    type: Schema.Types.ObjectId,
    ref: 'Client'
  },
  foodtruck: {
    type: Schema.Types.ObjectId,
    ref: 'Foodtruck'
  },
  date: {
    type: Date,
  },
  bookingDate: {
    type: Date,
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;