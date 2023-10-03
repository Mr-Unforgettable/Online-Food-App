const mongoose = require('mongoose')
require('dotenv').config()
// const mongoURI = `mongodb+srv://${username}:${password}@cluster0.vri3870.mongodb.net/gofood_db?retryWrites=true&w=majority`
const mongoURI = process.env.URI
const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true })
    console.log('Connected to DB')

    // Define the mongoose model for 'food_items'
    const foodItem = mongoose.model('food_items', new mongoose.Schema({}))
    const foodCategory = mongoose.model('food_categories', new mongoose.Schema({}))

    // Fetch and convert data
    const fetchedFoodItems = await foodItem.find({}).lean()
    const fetchedFoodCategories = await foodCategory.find({}).lean()

    // // Convert the fetchedData to an array
    // const dataArray1 = fetchedFoodItems.map(item => item.toObject())
    // const dataArray2 = fetchedFoodCategory.map(item => item.toObject())

    // Storing the data into the global variables
    global.foodItems = fetchedFoodItems
    global.foodCategories = fetchedFoodCategories
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    throw error
  }
}

module.exports = mongoDB
