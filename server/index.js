const express = require('express')
const controllers = require('./controllers.js');
const app = express()
const port = 1128

app.use(express.json())

app.get('/reviews', controllers.getReviews)

app.get('/reviews/meta', controllers.getReviewsMeta)

app.post('/reviews', controllers.postReview)

app.put('/reviews/:review_id/helpful', controllers.helpfulReview)

app.put('/reviews/:review_id/report', controllers.reportReview)

app.listen(port, () => {
  console.log(`API Service - listening on port: ${port}`)
})