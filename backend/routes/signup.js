const express = require('express')
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const router = express.Router()

router.post('/signup',
  [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'Incorrect Password').isLength({ min: 5 }) // Must be minimum 5 characters
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        location: req.body.location
      })
      res.json({ success: 'Account created successfully 😁' })
    } catch (err) {
      console.error(err)
      res.json({ success: 'Account creation failed 💀' })
    }
  })

module.exports = router
