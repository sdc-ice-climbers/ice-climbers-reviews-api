const express = require('express')
const db = require('./db/db.js')
const app = express()
const port = 1128

app.use(express.json())

// app.get('/', db.testQuery)

app.get('/reviews', db.getReviews)

app.get('/reviews/meta', db.getReviewsMeta)

app.post('/reviews', db.postReview)

app.put('/reviews/:review_id/helpful', db.helpfulReview)

app.put('/reviews/:review_id/report', db.reportReview)

app.listen(port, () => {
  console.log(`API Service - listening on port: ${port}`)
})