const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hostSchema = new Schema({
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password:{type: String,required: true},
  image: String,
  preferences: {type: String, enum: []},
  reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Foodtruck" }],
});

const Host = mongoose.model("Host", hostSchema);

module.exports = Host;
