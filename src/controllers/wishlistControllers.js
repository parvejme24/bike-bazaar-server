const Wishlist = require("../models/WishlistsModel");


// get wishlist controller
exports.getWishlist = async (req, res) => {
  try {
    const userEmail = req.params.email;
    const wishlist = await Wishlist.find({ customer_email: userEmail });
    res.status(200).json(wishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};



// add to wishlists
exports.addToWishlists = async (req, res) => {
  try {
    const email = req.params.email;
    const incomingWishlists = req.body; 

    // Retrieve existing carts for the user
    const filter = { customer_email: email };
    const existingWishlist = await Wishlist.find(filter);

    const insertedIds = [];

    // Iterate over each incoming cart item
    for (const wishlist of incomingWishlists) {
      // Check if the product already exists in the user's carts
      const existingProduct = existingWishlist.find(item => item.product_id === wishlist.product_id);

      if (existingProduct) {
        // Product already exists, skip insertion
        continue;
      }

      // Create a new cart object
      const newWishlist = new Wishlist({
        ...wishlist,
      });

      const result = await newWishlist.save();
      insertedIds.push(result._id); // Store the inserted cart's ID
    }

    res.send({
      message: "Wishlist added successfully",
      insertedIds: insertedIds
    });
  } catch (error) {
    console.error("Error adding cart data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// add to new wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const wishlist = req.body;
    const email = req.params.email;
    const filter = { customer_email: email };
    const wishlists = await Wishlist.find(filter);
    const existingProduct = wishlists.find(
      (item) => item.product_id === wishlist?.product_id
    );


    if (existingProduct) {
      return res.status(203).send({
        message: "This product already exists",
        insertedId: null,
      });
    }
    const newWishlist = new Wishlist(wishlist);
    const result = await newWishlist.save();
    res.status(200).send(result);
  } catch (error) {
    console.error("Error getting cart data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// remove wishlist controrller

exports.removeFromWishlist = async (req, res) => {
  try {
    const id = req.params.id;
    const result =  await Wishlist.findByIdAndDelete(id);
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

