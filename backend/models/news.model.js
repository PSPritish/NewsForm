const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
    timeStamp: String,
    title: String,
    description: String,
    city: String,
    category: String,
    publisher: String,
    phone: String,
    image_url: String
});

module.exports = mongoose.model("News", NewsSchema);
