"use strict"
const pool = require('../config/pool')

function findOneById(id) {
  return `SELECT id, name, balance FROM retail.users WHERE id=${id}`
}

class QuestionController {
  static async getAllUsers(req, res) {
    try {
      const client = await pool.connect();
      const fetchedQuery = await client.query('SELECT id,name FROM retail.users');
      const results = fetchedQuery.rows

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

  static async getAUser(req, res) {
    const { userId } = req.params

    try {
      const client = await pool.connect();
      const fetchedQuery = await client.query(findOneById(userId));
      if (fetchedQuery.rowCount === 0) {
        res.status(404).json({
          status: "error",
          message: 'Not found'
        })
      } else {
        const foundUser = fetchedQuery.rows[0]

        res.status(200).json({
          status: "success",
          data: foundUser
        })
      }
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: error
      })
    }
  }

  static async topUpUserBalance(req, res) {
    try {
      const { user_id, amount } = req.body
      if (!user_id || !amount) {
        res.status(200).json({
          status: "error",
          message: 'Missing required parameter(s)'
        })
      } else {
        const fetchedQuery = await client.query(findOneById(user_id));
        if (fetchedQuery.rowCount === 0) {
          res.status(404).json({
            status: "error",
            message: 'Not found'
          })
        } else {
          const user = result.rows[0]
          const updatedBalance = user.balance + amount

          const updateBalanceQuery = `UPDATE retail.users SET balance=${updatedBalance} WHERE id=${user_id};`
          await client.query(updateBalanceQuery)

          res.status(200).json({
            status: "success"
          })
        }
      }
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: error
      })
    }
  }
}

module.exports = QuestionController