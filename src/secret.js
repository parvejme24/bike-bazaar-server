require("dotenv").config();
const serverPort = process.env.SERVER_RUNNING_PORT || 5020;
// const mongodbURL1 = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tp10jin.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const mongodbURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1roku.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

module.exports = { serverPort, mongodbURL };
