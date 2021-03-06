"use strict"
const axios = require('axios')
const pool = require('../config/pool')
const EXTERNAL_BASE_URL = 'http://ec2-18-142-43-113.ap-southeast-1.compute.amazonaws.com/api'

function findOneById(id) {
  return `SELECT id, name, balance FROM retail.users WHERE id=${id}`
}

class QuestionController {
  static async getAllUsers(req, res) {
    try {
      const client = await pool.connect();
      const fetchedQuery = await client.query('SELECT id,name FROM retail.users');
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

  static async getAUser(req, res) {
    const { userId } = req.params

    try {
      const client = await pool.connect();
      const fetchedQuery = await client.query(findOneById(userId));
      client.release()

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
        const client = await pool.connect();
        const fetchedQuery = await client.query(findOneById(user_id));
        if (fetchedQuery.rowCount === 0) {
          client.release()
          res.status(404).json({
            status: "error",
            message: 'Not found'
          })
        } else {
          const user = fetchedQuery.rows[0]

          const params = new URLSearchParams()
          params.append('user_id', user_id)
          params.append('amount', amount)

          const response = await axios({
            method: 'post',
            url: `${EXTERNAL_BASE_URL}/phprestapi.php?function=insert_topup`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: params
          })

          if (response.data.status !== 200) {
            res.status(401).json({
              status: "failed",
              message: "Failed top up"
            })
          } else {
            const updatedBalance = Number(user.balance) + Number(amount)

            const updateBalanceQuery = `UPDATE retail.users SET balance=${updatedBalance} WHERE id=${user_id};`
            const fetchedBalanceQuery = await client.query(updateBalanceQuery)
            client.release()

            res.status(200).json({
              status: "success",
              message: `Current balance: IDR ${updatedBalance}`,
            })
          }
        }
      }
    } catch (error) {
      console.log(error, "<== error")

      res.status(500).json({
        status: "failed",
        message: error
      })
    }
  }
}

module.exports = QuestionController
