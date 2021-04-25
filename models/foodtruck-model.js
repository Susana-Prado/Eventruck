const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodtruckSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true, unique: true },
    image: {type: String, required: true, default: "https://img2.freepng.es/20180611/cxa/kisspng-user-profile-computer-icons-avatar-5b1ef062b893c3.674439551528754274756.jpg"},
    tags: {type: String, enum: ['vegan', 'vegetarian', 'non-alcohol']},
    specialty: {type: String, enum: ['asian', 'mediterranean', 'sushi']},
    price: {type: String, required: true},
    date: {type: Date},
    availability: {type: Date},
    // contact: type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Owner'
})

const Foodtruck = mongoose.model('Foodtruck', foodtruckSchema);

module.exports = Foodtruck;