const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const verifyAdmin = require("../middlewares/verifyAdmin");
const {getAllUsers, getOneUser, createUser, updateUser, getUserRoles } = require('../controllers/UserController')

const usersRoute = express.Router();

// usersRoute.get("/users", verifyToken, userControllers.getAllUsers);
usersRoute.get("/users", getAllUsers);
usersRoute.get("/users/:email", /* verifyToken, */ getOneUser);
// usersRoute.post("/users", /* verifyToken, */ createUser);
usersRoute.post("/users", createUser);
usersRoute.patch("/users/:id", /* verifyToken, */ updateUser);
usersRoute.get("/users/roles/:email", /* verifyToken, */ /* verifyAdmin, */ getUserRoles);

module.exports = usersRoute;
