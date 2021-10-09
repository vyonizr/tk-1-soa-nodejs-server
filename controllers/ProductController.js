"use strict"
const pool = require('../config/pool')

class TopicController {
  static async getAllProducts(req, res) {
    try {
      const client = await pool.connect();
      const fetchedQuery = await client.query('SELECT * FROM retail.products');
      const results = fetchedQuery.rows
      client.release()
      res.status(200).json({
        status: "success",
        data: results
      })
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: error
      })
    }
  }

  static async getAProduct(req, res) {
    const { productId } = req.params

    try {
      const client = await pool.connect();
      const fetchedQuery = await client.query(`SELECT * FROM retail.products WHERE id=${productId}`);
      client.release()
      if (fetchedQuery.rowCount === 0) {
        res.status(404).json({
          status: "error",
          message: 'Not found'
        })
      } else {
        const foundProduct = fetchedQuery.rows[0]

        res.status(200).json({
          status: "success",
          data: foundProduct
        })
      }
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: error
      })
    }
  }
}

module.exports = TopicController
