const Pool = require('pg').Pool
const pool = new Pool({
  user: 'austinchapin',
  host: 'localhost',
  database: 'ratings_reviews',
  port: 5432
})


// const selectQuery = 'SELECT id review_id, rating, summary, recommend, response, body, TO_TIMESTAMP(date/1000) date, reviewer_name, helpfulness FROM reviews WHERE product_id = 1;'

const photos = 'SELECT url FROM reviews_photos where review_id = 5';

// const insertReview = 'INSERT INTO id, product_id, rating, TO_TIMESTAMP(date/1000) date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness FROM reviews where product_id = 5;'

module.exports = {

  testQuery: (req, res) => {
    pool.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err)
      }
      res.json(results.rows[0])
    })
  },

  // -----------------------------------------------

  getReviews: (req, res) => {
    const product_id = req.query.product_id;
    const page  = req.query.page;
    const count = req.query.count;
    const sort  = req.query.sort;

    const selectQuery = `SELECT id review_id, rating, summary, recommend, response, body, TO_TIMESTAMP(date/1000) date, reviewer_name, helpfulness FROM reviews WHERE product_id = ${product_id};`

    pool.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err)
      }
      res.json(results.rows[0])
    })
    console.log(product_id, page, count, sort)
  },

  // -----------------------------------------------

  getReviewsMeta: (req, res) => {
    const product_id = req.query.product_id;
    const metaQuery = `SELECT id FROM reviews WHERE product_id = ${product_id};`

    pool.query(metaQuery, (err, results) => {
      if (err) {
        console.log(err)
      }
      res.json(results.rows[0])
    })
    console.log(product_id)
  }

  // -----------------------------------------------
}