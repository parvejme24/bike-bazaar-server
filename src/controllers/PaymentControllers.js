require("dotenv").config();
const SSLCommerzPayment = require("sslcommerz-lts");
const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASS;
const is_live = false; //true for live, false for sandbox

const { ObjectId } = require("mongodb");
const Carts = require("../models/CartsModel");
const Orders = require("../models/OrdersModel");
const Products = require("../models/ProductModel");
const { default: mongoose } = require("mongoose");

exports.postOrder = async (req, res) => {
  try {
    const userEmail = req.body.email;
    console.log("userEmail: ", userEmail);
    const filter = { customer_email: userEmail };
    const carts = await Carts.find(filter);
    console.log("carts: ", carts?.length);
    let totalProductPrice = 0;
    let totalProducts = 0;

    for (const cart of carts) {
      totalProductPrice += cart.total_price;
      totalProducts += cart.quantity;
    }
    const tran_id = new ObjectId().toString();

    const data = {
      total_amount: totalProductPrice,
      currency: "BDT",
      tran_id: tran_id, // use unique tran_id for each api call
      success_url: `https://munshi-wholesale-server.vercel.app/api/v1/success?tran_id=${tran_id}&email=${userEmail}`, //TODO: change the base url before deploy
      fail_url: "http://localhost:3030/fail",
      cancel_url: "http://localhost:3030/cancel",
      ipn_url: "http://localhost:3030/ipn",
      shipping_method: "Courier",
      product_name: "Computer.",
      product_category: "Book",
      product_profile: "gebneral",
      cus_name: "Customer Name",
      cus_email: userEmail,
      cus_add1: "Dhaka",
      cus_add2: "Dhaka",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: "01711111111",
      cus_fax: "01711111111",
      ship_name: "Customer Name",
      ship_add1: "Dhaka",
      ship_add2: "Dhaka",
      ship_city: "Dhaka",
      ship_state: "Dhaka",
      ship_postcode: 1000,
      ship_country: "Bangladesh",
    };

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

    sslcz.init(data).then(async (apiResponse) => {
      // Redirect the user to payment gateway
      let GatewayPageURL = apiResponse.GatewayPageURL;
      res.send({ url: GatewayPageURL });

      const finalOrder = {
        carts,
        tranjectionId: tran_id,
        isPaid: false,
        status: "Processing",
        totalProducts,
        totalPrice: totalProductPrice,
        clientEmail: userEmail,
      };

      const newOrder = new Orders(finalOrder);
      await newOrder.save();
      //  res.send(order)
    });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).send({ message: error.message })
  }
};

exports.postSuccess = async (req, res) => {
  const tranId = req.query.tran_id;
  const userEmail = req.query.email;
  const query = { tranjectionId: tranId };
  const updateOrder = await Orders.updateOne(query, {
    $set: {
      isPaid: true,
    },
  });

  if (updateOrder.modifiedCount >= 1) {
    const filter = {customer_email: userEmail };
    const carts = await Carts.find(filter);

    carts.map(async (cart) => {
      const product = await Products.findById(cart?.product_id);
      let stock_limit = product?.stock_limit;

      await Products.updateOne(query, {
        $set: {
          stock_limit: stock_limit - cart?.quantity,
        },
      });
    });
    await Carts.deleteMany(filter);

    res.redirect("https://sensational-valkyrie-0f292b.netlify.app/dashboard/my_order"); // TODO:  set live link before deploy
  }
  // res.send(deleteCarts);
};
