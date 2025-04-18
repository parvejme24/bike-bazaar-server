const express = require("express");
const { getWishlist, addToWishlist, removeFromWishlist , addToWishlists} = require("../controllers/wishlistControllers");

const wishlistRouter = express.Router();

// get all wishlist
wishlistRouter.get("/wishlist/:email", getWishlist);

// post a wishlist
wishlistRouter.post("/wishlist", addToWishlist);

// post many wishlist
wishlistRouter.post("/wishlists", addToWishlists);

// delete a wishlist
wishlistRouter.delete("/wishlist/:id", removeFromWishlist);



module.exports = wishlistRouter;