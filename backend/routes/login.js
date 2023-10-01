const express = require('express')
const User = require('../models/User')
const router = express.Router()

router.post('/login',
  async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    try {
      const userData = await User.findOne({ email })
      // console.log(userData)
      if (!userData) {
        return res.status(400).json({ error: 'Invalid Email!' })
      }
      if (password !== userData.password) {
        return res.status(400).json({ error: 'Invalid Password' })
      }

      return res.json({ success: '✔ Login successful 😁' })
    } catch (err) {
      console.error(err)
      res.json({ success: '❌ Login Failed 💀' })
    }
  })

module.exports = router
