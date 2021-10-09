"use strict"
const express = require("express")

const router = express.Router()
const { ProductController } = require("../controllers")

router.get("/", ProductController.getAllProducts)
router.get("/:productId", ProductController.getAProduct)

module.exports = router
