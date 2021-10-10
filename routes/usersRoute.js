"use strict"
const express = require("express")

const router = express.Router()
const { UserController } = require("../controllers")

router.get("/", UserController.getAllUsers)
router.post("/topup", UserController.topUpUserBalance)
router.get("/:userId", UserController.getAUser)

module.exports = router
