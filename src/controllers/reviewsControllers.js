const Reviews = require("../models/ReviewsModel");

// get reviews by product id
exports.getReviewsByProductId = async (req, res) => {
  try {
    const productId = req.params.productId;
    const filter = { product_id: productId };
    const result = await Reviews.find(filter);
    res.send(result);
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ message: error.message });
  }
};

// post a new review
exports.postReview = async (req, res) => {
  try {
    const review = new Reviews(req.body);
    const newReview = await review.save();
    res.send(newReview);
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ message: error.message });
  }
};

// get a  review
exports.getOneReview = async (req, res) => {
  try {
    const review = await Reviews.findById(req.params.id);
    res.send(review);
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ message: error.message });
  }
};

// update a review
exports.updateReview = async (req, res) => {
  try {
    const result = await Reviews.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(result);
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ message: error.message });
  }
};

// delete a review
exports.deleteReview = async (req, res) => {
  try {
    const result = await Reviews.findByIdAndDelete(req.params.id);
    res.send(result);
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ message: error.message });
  }
};

// get reviews by user email
exports.getUserReviewsByEmail = async (req, res) => {
  try {
    const userEmail = req.params.email;
    const userReviews = await Reviews.find({ user_email: userEmail });
    res.json(userReviews);
  } catch (error) {
    console.error('Error fetching user reviews:', error);
    res.status(500).json({ error: "Internal server error" });
  }
};
