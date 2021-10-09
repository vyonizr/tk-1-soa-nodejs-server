"use strict"
const express = require("express")

const router = express.Router()
const { CourierController } = require("../controllers")

router.get("/", CourierController.getAllCouriers)
router.get("/:courierId", CourierController.getAllShipments)

module.exports = router
