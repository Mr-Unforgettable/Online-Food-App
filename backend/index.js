const express = require('express')
const app = express()
const port = 3001
const mongoDB = require('./db')

mongoDB()

// CORS headers middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next() // call next() to move to the next middleware or route handler.
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json())
app.use('/api', require('./routes/signup'))

app.use(express.json())
app.use('/api', require('./routes/login'))

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
