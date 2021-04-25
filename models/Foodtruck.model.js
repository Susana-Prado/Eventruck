const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodtruckSchema = new Schema({
  name: String, 
  description: String,
  image: String,
  tags: String, enum: [],
  specialty: String, enum: [], 
  price: Number, 
  date: Date,
  availability: Boolean,
  contact: mongoose.Schema.Types.ObjectId, ref: "Owner",
});

const Foodtruck = mongoose.model("Foodtruck", foodtruckSchema);

module.exports = Foodtruck;
