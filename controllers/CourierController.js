"use strict"
const axios = require('axios')
const EXTERNAL_BASE_URL = 'https://young-plateau-37479.herokuapp.com'

class TopicController {
  static async getAllCouriers(req, res) {
    try {
      const response = await axios({
        method: 'get',
        url: `${EXTERNAL_BASE_URL}/couriers`
      })

      res.status(200).json(response.data)
    } catch (error) {
      console.log(error)
      res.status(500).json({
        status: "failed",
        message: error
      })
    }
  }

  static async getAllShipments(req, res) {
    const { courierId } = req.params

    try {
      const response = await axios({
        method: 'get',
        url: `${EXTERNAL_BASE_URL}/couriers/${courierId}`
      })

      res.status(200).json(response.data)
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: error
      })
    }
  }
}

module.exports = TopicController
