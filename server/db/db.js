const Pool = require('pg').Pool
const pool = new Pool({
  user: 'austinchapin',
  host: 'localhost',
  database: 'ratings_reviews',
  port: 5432
})

const { metaData, getReviews, helpfulQuery, reportQuery, postReview } = require('./queries.js')






module.exports = {

  testQuery: (req, res) => {
    const product_id = 54550;
    pool.query(metaData, [product_id])
      .then(results => res.json(results.rows[0]))
      .catch(error => {
        console.log(error);
        res.sendStatus(500);
      })
  },


  // -----------------------------------------------


  getReviews: (req, res) => {
    let { product_id, sort, page, count } = req.query;
    let offset = count * page - count;

    if (sort === 'newest') {
      sort = 'R.date DESC'
    } else if (sort === 'helpfulness') {
      sort = 'R.helpfulness DESC'
    } else if (sort === 'relevant') {
      sort = 'R.helpfulness DESC'
    }

    pool.query(getReviews, [product_id, sort, count, offset])
      .then(results => {
        res.send({
          "product": product_id,
          "page": Number(page),
          "count": Number(count),
          "results": results.rows
        })
      })
      .catch(error => {
        console.log(error);
        res.sendStatus(500);
      })
  },


  getReviewsMeta: (req, res) => {
    const { product_id }= req.query;

     pool.query(getMetaData, [product_id])
      .then(results => res.json(results.rows[0]))
      .catch(error => {
        console.log(error);
        res.sendStatus(500);
      })
  },


  postReview: (req, res) => {

    const { product_id, rating, summary, body, name, email } = req.body

    pool.query(postReview, [product_id, rating, summary, body, name, email])
      .then(results => {

        results.rows[0]

        // res.json(results)
      })
      .catch(error => {
        console.log(error);
        res.sendStatus(500);
      });
  },


  helpfulReview: (req, res) => {
    const { review_id } = req.params;

    pool.query(helpfulQuery, [review_id])
      .then(results => res.send(200))
      .catch(error => {
        console.log(error);
        res.sendStatus(500);
      })
  },


  reportReview: (req, res) => {
    const { review_id } = req.params;

    pool.query(reportQuery, [review_id])
      .then(result => res.send(200))
      .catch(error => {
        console.log(error);
        res.sendStatus(500);
      })
  }
}