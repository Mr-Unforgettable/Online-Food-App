const express = require('express')
const app = express()
const port = 3001
const mongoDB = require('./db')

mongoDB()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json())
app.use('/api', require('./routes/createUser'))

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
