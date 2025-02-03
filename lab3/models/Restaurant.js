const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
    address: {
        building: String,
        street: String,
        zipcode: String,
    },
    city: {
        type: String,
        required: true,
    },
    cuisine: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    restaurant_id: {
        type: String,
        required: true,
        unique: true,
    }
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
