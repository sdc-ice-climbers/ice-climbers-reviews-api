const express = require('express');
const router = express.Router();
const controllers = require('./controllers.js');


router.get('/reviews', controllers.getReviews);

router.get('/reviews/meta', controllers.getReviewsMeta);

router.post('/reviews', controllers.postReview);

router.put('/reviews/:review_id/helpful', controllers.helpfulReview);

router.put('/reviews/:review_id/report', controllers.reportReview);


module.exports = router;