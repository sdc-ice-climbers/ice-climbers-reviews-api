const express = require('express')
const bodyParser = require('body-parser')
const db = require('./db/db.js')
const app = express()
const port = 1128

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// app.use(express.json())

app.get('/', db.testQuery)

// app.get('/', (req, res) => {
//   res.send('Testing server');
//   // res.json({info: 'Testing server'})
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})