const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ownerSchema = new Schema({
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String,required: true},
  image: String,
  NIF: {Number, required: true, unique: true},
  mobilephone: {type: Number, required: true},
  foodtrucks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Foodtruck" }],
});

const Owner = mongoose.model("Owner", ownerSchema);

module.exports = Owner;
