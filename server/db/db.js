const Pool = require('pg').Pool
const pool = new Pool({
  user: 'austinchapin',
  host: 'localhost',
  database: 'ratings_reviews',
  port: 5432
})

const { metaData } = require('./queries.js')






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
    const { product_id, page, count, sort } = req.query;

    if (sort === 'newest') {
      sort = 'order by R.date desc'
    } else if (sort = 'helpful') {
      sort = 'order by R.helpfulness desc'
    } else if (sort = 'relevant') {
      sort = ''
    }

    // prod id = $1, sort = $2, page = $3, count = $4


    pool.query(getReviews, [product_id, sort, page, count])
      .then(results => res.json(results.rows))
      .catch(error => {
        console.log(error);
        res.send(500);
      })
  },


  getReviewsMeta: (req, res) => {
    const { product_id }= req.query;

     pool.query(getMetaData, [product_id])
      .then(results => res.json(results.rows[0]))
      .catch(error => {
        console.log(error);
        res.send(500);
      })
  },


  postReview: (req, res) => {
    // req.body
    console.log('test post')
  },


  helpfulReview: (req, res) => {
    const { review_id } = req.params;

    pool.query(helpfulQuery, [review_id])
      .then(results => res.send(200))
      .catch(error => {
        console.log(error);
        res.send(500);
      })
  },


  reportReview: (req, res) => {
    const { review_id } = req.params;

    pool.query(reportQuery, [review_id])
      .then(result => res.send(200))
      .catch(error => {
        console.log(error);
        res.send(500);
      })
  }
}