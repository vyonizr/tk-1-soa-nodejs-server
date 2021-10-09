const router = require("express").Router()

const users = require("./usersRoute")
const topics = require("./productsRoute")
const couriers = require("./couriersRoute")

router.get("/", function (req, res) {
  res.status(200).json({
    status: "TK 1 SOA API is alive"
  });
});

router.use("/api/users", users)
router.use("/api/products", topics)
router.use("/api/couriers", couriers)

router.use(function (req, res, next) {
  res.status(404).json({
    status: "error",
    message: "Not found"
  })
})

module.exports = router
