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

app.get('/reviews', db.getReviews)

app.get('/reviews/meta', db.getReviewsMeta)

app.post('/reviews', db.postReview)

app.put('/reviews/:review_id/helpful', db.helpfulReview)

app.put('/reviews/:review_id/report', db.reportReview)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})