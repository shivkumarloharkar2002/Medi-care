const express = require("express");
const { Dashboard_date } = require("../controller/Dashboard_controller");
const { authorizeRoles, authenticateToken } = require("../middleware/verify");

const Dashoard_route = express.Router();

Dashoard_route.get("/getalldata",authenticateToken ,authorizeRoles("Doctor", "Admin", "SuperAdmin"), Dashboard_date)

module.exports = Dashoard_route