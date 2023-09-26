const express = require('express')
const app = express()
const port = 3001
const mongoDB = require('./db')

mongoDB()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
