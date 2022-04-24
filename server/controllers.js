// Bring in models
const models = require('./models.js');



module.exports = {

  getReviews: (req, res) => {
    let { product_id, sort, page, count } = req.query;

    models.getReviews( {product_id, sort, page, count} )
      .then(results => {
        res.send({
          "product": product_id,
          "page": Number(page),
          "count": Number(count),
          "results": results.rows
        })
      })
      .catch(error => res.sendStatus(404))
  },


// --------------------------------------


  getReviewsMeta: (req, res) => {
    const { product_id }= req.query;
    models.getMetaData({ product_id })
    .then(results => res.json(results.rows[0]))
    .catch(error => {
      console.log(error)
      res.sendStatus(404)
    })
  },


// --------------------------------------


  postReview: (req, res) => {
    models.postReview(req.body)
      .then(results => {
        res.send(results.rows[0])
      })
      .catch(error => {
        console.log(error);
        res.sendStatus(404);
      })
  },


  // --------------------------------------


  helpfulReview: (req, res) => {
    const { review_id } = req.params;
    models.helpfulReview({ review_id })
      .then(results => {
        res.sendStatus(200)
      })
      .catch(error => {
        console.log(error)
        res.sendStatus(404)
      })
  },


  reportReview: (req, res) => {
    const { review_id } = req.params;
    models.reportReview({ review_id })
      .then(results => {
        res.sendStatus(200)
      })
      .catch(error => {
        console.log(error)
        res.sendStatus(404)
      })
  }
}