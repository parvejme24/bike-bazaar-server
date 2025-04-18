const mongoose = require("mongoose");

const reviewsSchema = new mongoose.Schema({
  user_name: String,
  user_email: String,
  user_image: String,
  comment: String,
  rating: Number,
  product_id: String,
  review_time: {
    type: Date,
    default: Date.now(),
  },
});

const Reviews = mongoose.model("reviews", reviewsSchema);

module.exports = Reviews;
