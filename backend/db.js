const mongoose = require('mongoose')
require('dotenv').config()
const username = process.env.DB_USER
const password = process.env.DB_PASSWORD
// console.log('Username', process.env.USERNAME)
// console.log('Password', process.env.PASSWORD)
const mongoURI = `mongodb+srv://${username}:${password}@cluster0.vri3870.mongodb.net/?retryWrites=true&w=majority`

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true })
    console.log('Connected to DB')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  }
}

module.exports = mongoDB
