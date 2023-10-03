const express = require('express')
const router = express.Router()

router.post('/fetchData', (req, res) => {
  try {
    // console.log(global.foodItems, global.foodCategory)
    res.send([
      global.foodItems,
      global.foodCategories
    ])
  } catch (error) {
    console.error(error.message)
    res.send('Internal Server Error')
  }
})

module.exports = router
