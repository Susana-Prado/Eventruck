const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodtruckSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true, unique: true },
    image: {type: String, required: true, default: "https://img2.freepng.es/20180611/cxa/kisspng-user-profile-computer-icons-avatar-5b1ef062b893c3.674439551528754274756.jpg"},
    price: {type: Number, required: true},
    date: [{type: Date}],
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
    coffee: {type: Boolean, default: false},
    beer: {type: Boolean, default: false},
    cocktails: {type: Boolean, default: false},
    iceCream: {type: Boolean, default: false},
    cakes: {type: Boolean, default: false},
    dessert: {type: Boolean, default: false},
    any: {type: Boolean, default: true},
    creator: {type: Schema.Types.ObjectId, ref: 'Owner' }
})

const Foodtruck = mongoose.model('Foodtruck', foodtruckSchema);

module.exports = Foodtruck;