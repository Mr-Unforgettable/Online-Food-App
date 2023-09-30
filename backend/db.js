const mongoose = require('mongoose')
require('dotenv').config()
const username = process.env.DB_USER
const password = process.env.DB_PASSWORD
// console.log('Username', process.env.USERNAME)
// console.log('Password', process.env.PASSWORD)
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

/* const mongoDB = async () => {
  await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
    if (err) {
      console.log('---', err)
    } else {
      console.log('connected')
      const fetchedData = await mongoose.connection.db.collection('food_items')
      fetchedData.find({}).toArray((err, data) => {
        if (err) {
          console.log(err)
        } else {
          console.log(data)
        }
      })
    }
  })
} */

module.exports = mongoDB
