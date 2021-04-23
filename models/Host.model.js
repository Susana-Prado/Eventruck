const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hostSchema = new Schema({
  username: String, {required: true, unique: true},
  email: String, {required: true, unique: true},
  password: String, {required: true},
  image: String,
  preferences: String, enum: [],
  reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Foodtruck" }],
});

const Host = mongoose.model("Host", hostSchema);

module.exports = Host;
