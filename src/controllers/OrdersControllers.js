const Orders = require("../models/OrdersModel");
const Products = require("../models/ProductModel");
const Product = require("../models/ProductModel");
const Users = require("../models/UserModel");
const cron = require('node-cron');


// get all orders 
exports.getAllOrders = async (req, res) => {
  try {

    const orders = await Orders.find().sort({ orderDate: -1 });
    const allOrders = orders.reduce((accumulator, order) => {
      // Flatten each order's carts array into one array of attributes
      order.carts.forEach(cart => {
        const cartAttributes = {
          _id: order._id,
          customer_name: cart.customer_name,
          owner_email: cart.owner_email,
          product_id: cart.product_id,
          unit_price: cart.unit_price,
          total_price: cart.total_price,
          quantity: cart.quantity,
          isDelivered: cart.isDelivered,
          cover_image: cart.product_image,
          stock_limit: cart.stock_limit,
          title: cart.title,
          tranjectionId: order.tranjectionId,
          isPaid: order.isPaid,
          status: order.status,
          totalProduct: order.totalProduct,
          totalPrice: order.totalPrice,
          orderDate: order.orderDate,
          clientEmail: order.clientEmail
        };
        accumulator.push(cartAttributes);
      });
      return accumulator;
    }, []);

    res.send({ allOrders });
  } catch (error) {
    console.error("Error getting my orders data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get my orders by email
exports.getMyOrders = async (req, res) => {
  try {
    const email = req.params.email;
    const filter = { clientEmail: email };
    const orders = await Orders.find(filter).sort({ orderDate: -1 });

    const myOrders = orders.reduce((accumulator, order) => {
      // Flatten each order's carts array into one array of attributes
      order.carts.forEach(cart => {
        const cartAttributes = {
          customer_name: cart.customer_name,
          owner_email: cart.owner_email,
          product_id: cart.product_id,
          unit_price: cart.unit_price,
          total_price: cart.total_price,
          quantity: cart.quantity,
          isDelivered: cart.isDelivered,
          cover_image: cart.product_image,
          stock_limit: cart.stock_limit,
          title: cart.title,
          tranjectionId: order.tranjectionId,
          isPaid: order.isPaid,
          status: order.status,
          totalProduct: order.totalProduct,
          totalPrice: order.totalPrice,
          orderDate: order.orderDate,
          clientEmail: order.clientEmail
        };
        accumulator.push(cartAttributes);
      });
      return accumulator;
    }, []);

    res.send({ myOrders });
  } catch (error) {
    console.error("Error getting my orders data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




// get seller orders by owner email;

exports.getSellerOrders = async (req, res) => {
  try {
    const ownerEmail = req.params.email;
    const orders = await Orders.find();
    const allCarts = [];

    orders.forEach((order) => {
      const cartsInOrder = order.carts;
      allCarts.push(...cartsInOrder);
    });

    const productPromises = allCarts.map(async (cart) => {
      const id = cart?.product_id;
      const product = (await Product.findById(id)) || {};
      return product;
    });

    const products = await Promise.all(productPromises);

    const sellerproducts = products.filter(
      (product) => product.owner_email === ownerEmail
    );

    res.send(sellerproducts);
  } catch (error) {
    console.error("Error getting my orders data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get total orders
exports.getTotalProductsOrder = async (req, res) => {
  try {
    const orders = await Orders.find();

    let totalProductsOrders = 0;
    orders.forEach((order) => {
      order.carts.forEach((cartItem) => {
        totalProductsOrders += cartItem.quantity;
      });
    });

    res.status(200).json({ totalProductsOrders });
  } catch (error) {
    console.error("Error getting my orders data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get total sales
exports.getTotalProductsSold = async (req, res) => {
  try {
    const orders = await Orders.find();

    let totalProductsSold = 0;
    orders.forEach((order) => {
      if (order?.isDeliverd) {
        order.carts.forEach((cartItem) => {
          totalProductsSold += cartItem.quantity;
        });
      }
    });

    res.status(200).json({ totalProductsSold });
  } catch (error) {
    console.error("Error getting my orders data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get total revenue
exports.getTotalRevenue = async (req, res) => {
  try {
    const orders = await Orders.find();

    let totalRevenue = 0;
    orders.forEach((order) => {
      totalRevenue += order?.totalPrice;
    });

    res.status(200).json({ totalRevenue });
  } catch (error) {
    console.error("Error getting my orders data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get Customers
exports.getCustomers = async (req, res) => {
  try {
    const orders = await Orders.find();

    let customers = [];
    orders.forEach( async(order) => {
      const email = order?.clientEmail;
      const customer = await Users.findOne({email: email});
      customer.push(customer)
    });

    res.status(200).json({ customers });
  } catch (error) {
    console.error("Error getting  customers data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get recent 10 orders
exports.getRecentTenOrder = async (req, res) => {
  try {
    const recentOrders = await Orders.find()
      .sort({ orderDate: -1 }) // Sort by orderDate in descending order
      .limit(10); // Limit the result to 10 entries
    res.status(200).json({ recentOrders });
  } catch (error) {
    console.error("Error getting recent orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// get today's sales and orders
exports.getTodaysSalesAndOrders = async (req, res) => {
  try {
    // Get the start and end of today
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0); // Set time to midnight
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999); // Set time to end of the day

    // Find orders placed today
    const todayOrders = await Orders.find({
      orderDate: { $gte: todayStart, $lt: todayEnd }
    });

    // Calculate total sales for today
    const totalSales = todayOrders.reduce((total, order) => {
      return total + order.totalPrice;
    }, 0);

    res.status(200).json({ totalOrders: todayOrders.length, totalSales });
  } catch (error) {
    console.error("Error getting today's sales and orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get top 5 brands and the total quantity of products ordered by each brand
exports.getTopBrandsWithQuantity = async (req, res) => {
  try {
    // Aggregate orders to get unique product_ids
    const orderedProducts = await Orders.aggregate([
      { $unwind: '$carts' }, // Unwind to destructure the array of carts
      { $group: { _id: '$carts.product_id', quantity: { $sum: '$carts.quantity' } } }, // Group by product_id to get unique values and calculate total quantity
    ]);

    // Extract product_ids and their quantities from the aggregated result
    const productQuantities = {};
    orderedProducts.forEach((item) => {
      productQuantities[item._id] = item.quantity;
    });

    // Find products with the extracted product_ids
    const products = await Products.find({ _id: { $in: Object.keys(productQuantities) } });

    // Create a map to store brand and total quantity ordered
    const brandQuantities = {};

    // Calculate total quantity ordered for each brand
    products.forEach((product) => {
      const brand = product.brand;
      const quantity = productQuantities[product._id];
      if (brandQuantities[brand]) {
        brandQuantities[brand] += quantity;
      } else {
        brandQuantities[brand] = quantity;
      }
    });

    // Sort brandQuantities by total quantity in descending order
    const sortedBrands = Object.keys(brandQuantities).sort((a, b) => brandQuantities[b] - brandQuantities[a]);

    // Get top 5 brands
    const topBrandsWithQuantity = sortedBrands.slice(0, 5).map((brand) => ({ brand, quantity: brandQuantities[brand] }));

    res.status(200).json({ topBrandsWithQuantity });
  } catch (error) {
    console.error("Error getting top brands with quantity:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get top 5 category and the total quantity of products ordered by each brand
exports.getTopCategoriesWithQuantity = async (req, res) => {
  try {
    // Aggregate orders to get unique product_ids
    const orderedProducts = await Orders.aggregate([
      { $unwind: '$carts' }, // Unwind to destructure the array of carts
      { $group: { _id: '$carts.product_id', quantity: { $sum: '$carts.quantity' } } }, // Group by product_id to get unique values and calculate total quantity
    ]);

    // Extract product_ids and their quantities from the aggregated result
    const productQuantities = {};
    orderedProducts.forEach((item) => {
      productQuantities[item._id] = item.quantity;
    });

    // Find products with the extracted product_ids
    const products = await Products.find({ _id: { $in: Object.keys(productQuantities) } });

    // Create a map to store category and total quantity ordered
    const categoryQuantities = {};

    // Calculate total quantity ordered for each category
    products.forEach((product) => {
      const category = product.category;
      const quantity = productQuantities[product._id];
      if (categoryQuantities[category]) {
        categoryQuantities[category] += quantity;
      } else {
        categoryQuantities[category] = quantity;
      }
    });

    // Sort categoryQuantities by total quantity in descending order
    const sortedcategorys = Object.keys(categoryQuantities).sort((a, b) => categoryQuantities[b] - categoryQuantities[a]);

    // Get top 5 categorys
    const topcategorysWithQuantity = sortedcategorys.slice(0, 5).map((category) => ({ category, quantity: categoryQuantities[category] }));

    res.status(200).json({ topcategorysWithQuantity });
  } catch (error) {
    console.error("Error getting top categorys with quantity:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Get top 10 popular products based on orders
exports.getTopPopularProducts = async (req, res) => {
  try {
    // Aggregate orders to count occurrences of each product
    const popularProducts = await Orders.aggregate([
      { $unwind: '$carts' }, // Unwind to destructure the array of carts
      {
        $group: {
          _id: '$carts.product_id', // Group by product_id
          totalOrders: { $sum: '$carts.quantity' }, // Count the total orders for each product
        },
      },
      { $sort: { totalOrders: -1 } }, // Sort by total orders in descending order
      { $limit: 10 }, // Limit to 10 results
    ]);

    // Extract product_ids from the aggregated result
    const productIds = popularProducts.map((item) => item._id);

    // Find products with the extracted product_ids
    const products = await Products.find({ _id: { $in: productIds } });

    // Map popularProducts with product details
    const popularProductsWithDetails = popularProducts.map((item) => {
      const product = products.find((product) => product._id.toString() === item._id.toString());
      return {
        product_id: item._id,
        totalOrders: item.totalOrders,
        product_details: product,
      };
    });

    res.status(200).json({ popularProducts: popularProductsWithDetails });
  } catch (error) {
    console.error("Error getting top popular products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



// Set up a cron job to run every 24 hours
cron.schedule('0 0 * * *', async () => {
  try {
    // Find orders that are marked as "Shipped" and have an updatedAt timestamp more than 24 hours ago
    const ordersToBeDelivered = await Orders.find({
      status: "Shipped",
      updatedAt: { $lte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    });

    // Update status of orders found to "Delivered"
    for (const order of ordersToBeDelivered) {
      await Orders.findByIdAndUpdate(order._id, { status: "Delivered" });
    }
  } catch (error) {
    console.error("Error updating order status:", error);
    // Handle error accordingly
  }
});

// orders update controller
exports.orderUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    // Check if status is being updated to 'Shipped'
    if (updateData.status && updateData.status === "Shipped") {
      // Update updatedAt field to current time
      updateData.updatedAt = Date.now();

      // Update order status to "Shipped"
      const updateStatus = await Orders.findByIdAndUpdate({_id: id}, updateData, { new: true });

      // Check if the order is updated successfully
      if (updateStatus) {
        res.send(updateStatus);
        // Call handleStatusChange function to automatically update status to 'Delivered' after 24 hours
        handleStatusChange(id);
      } else {
        res.status(404).json({ message: "Order not found" });
      }
    } else {
      // If status is not being updated to 'Shipped', proceed normally
      const updateStatus = await Orders.findByIdAndUpdate({_id: id}, updateData, { new: true });
      res.send(updateStatus);
    }
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to handle status change
const handleStatusChange = async (orderId) => {
  try {
    // Delay for 24 hours (86400000 milliseconds)
    setTimeout(async () => {
      // Update order status to 'Delivered'
      await Orders.findByIdAndUpdate(orderId, { status: "Delivered", updatedAt: Date.now() });
    }, 86400000);
  } catch (error) {
    console.error("Error handling status change:", error);
    // Handle error accordingly
  }
};
