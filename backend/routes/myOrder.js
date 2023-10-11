const express = require('express')
const router = express.Router()
const Order = require('../models/Orders')

router.post('/myOrder', async (req, res) => {
  try {
    const eID = await Order.findOne({ email: req.body.email })
    res.json({ orderData: eID })
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Internal server error!')
  }
})

module.exports = router
