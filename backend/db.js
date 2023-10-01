const mongoose = require('mongoose')
require('dotenv').config()
const username = process.env.DB_USER
const password = process.env.DB_PASSWORD
const mongoURI = `mongodb+srv://${username}:${password}@cluster0.vri3870.mongodb.net/gofood_db?retryWrites=true&w=majority`

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true })
    console.log('Connected to DB')

    // Define the mongoose model for 'food_items'
    const FoodItems = mongoose.model('food_items', new mongoose.Schema({}))

    // Fetch and execute query
    const fetchedData = await FoodItems.find({}).exec()
    // Convert the fetchedData to an array
    const dataArray = fetchedData.map(item => item.toObject())
    console.log(dataArray)
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  }
}

module.exports = mongoDB
