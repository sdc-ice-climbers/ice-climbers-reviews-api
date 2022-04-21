const express = require('express')
const bodyParser = require('body-parser')
const db = require('./db/db.js')
const app = express()
const port = 1128

// app.use(bodyParser.json())
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// )

app.use(express.json())

// app.get('/', db.testQuery)


// getReviews ---- axios.get(host + `/reviews/?product_id=${product_id}&page=${page}&count=${count}&sort=${sort}`, options)
app.get('/reviews', db.getReviews)

// getReviewMetadata ----- axios.get(host + `/reviews/meta/?product_id=${product_id}`, options)
app.get('/reviews/meta', db.getReviewsMeta)






app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})