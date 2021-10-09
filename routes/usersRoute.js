"use strict"
const express = require("express")

const router = express.Router()
const { UserController } = require("../controllers")

router.get("/", UserController.getAllUsers)
router.get("/:userId", UserController.getAUser)
router.post("/topup", UserController.topUpUserBalance)

module.exports = router
