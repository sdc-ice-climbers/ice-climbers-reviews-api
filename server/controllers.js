// Bring in models
const models = require('./models.js');



module.exports = {

  getReviews: (req, res) => {
    let { product_id, sort, page, count } = req.query;

    models.getReviews( { product_id, sort, page, count })
    .then(results => {
      res.send({
        "product": product_id,
        "page": Number(page),
        "count": Number(count),
        "results": results.rows
      })
    })
      .catch(error => {
        res.send(error)
      })
  },

// --------------------------------------

  getReviewsMeta: (req, res) => {
    const { product_id }= req.query;

    models.getMetaData( )
    .then(results => {
      res.send(results)
    })
    .catch(error => {
      res.send(error)
    })
  },

// --------------------------------------

  postReview: (req, res) => {

    models.postReview(  )
    .then(results => {
      res.send(results)
    })
    .catch(error => {
      res.send(error)
    })
  },

  // --------------------------------------

  helpfulReview: (req, res) => {

    models.helpfulReview()
      .then(results => {
        res.send(results)
      })
      .catch(error => {
        res.send(error)
      })
  },


  reportReview: (req, res) => {


    models.reportReview()
      .then(results => {
        res.send(results)
      })
      .catch(error => {
        res.send(error)
      })
  }
}