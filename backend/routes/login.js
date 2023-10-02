const express = require('express')
const User = require('../models/User')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const jwtSecret = process.env.JWT_TOKEN

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

      const pwdCompare = await bcrypt.compare(password, userData.password)
      if (!pwdCompare) {
        return res.status(400).json({ error: 'Invalid Password' })
      }

      const data = {
        user: {
          id: userData.id
        }
      }

      const authToken = jwt.sign(data, jwtSecret)

      return res.json({ success: '✔ Login successful 😁', authToken })
    } catch (err) {
      console.error(err)
      res.json({ success: '❌ Login Failed 💀' })
    }
  })

module.exports = router
