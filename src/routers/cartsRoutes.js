const express = require('express');
const { getMyCartsController, getOneCartController, postCartController, postManyCartsConroller, updateCartController, deleteCartController, deleteMyCartsController } = require('../controllers/cartsControllers');

const cartsRouter = express.Router();


// get all carts by customer email
cartsRouter.get("/myCarts/:email", getMyCartsController )

// get one cart by id
cartsRouter.get("/myCarts/:id", getOneCartController )

// post a cart
cartsRouter.post("/myCarts/:email", postCartController )

// post many cart
cartsRouter.post("/carts", postManyCartsConroller )

// update a cart
cartsRouter.patch("/myCarts/:id", updateCartController )

// delete a cart by id
cartsRouter.delete("/myCarts/:id", deleteCartController )

// delete my all carts by email
cartsRouter.delete("/deleteCarts/:email", deleteMyCartsController )


module.exports = cartsRouter;