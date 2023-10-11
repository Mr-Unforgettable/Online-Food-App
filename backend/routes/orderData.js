const express = require('express')
const router = express.Router()
const Order = require('../models/Orders')

router.post('/orderData', async (req, res) => {
  try {
    const data = req.body.order_data
    data.unshift({ order_date: req.body.order_date })

    const eId = await Order.findOne({ email: req.body.email })

    if (eId === null) {
      await Order.create({
        email: req.body.email,
        order_data: [data]
      })
      res.json({ success: true })
    } else {
      await Order.findOneAndUpdate({ email: req.body.email },
        { $push: { order_data: data } })
      res.json({ success: true })
    }
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
