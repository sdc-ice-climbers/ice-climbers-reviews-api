const Pool = require('pg').Pool
const pool = new Pool({
  user: 'austinchapin',
  host: 'localhost',
  database: 'ratings_reviews',
  port: 5432
})

const { getReviews, getMetaData, helpfulReview, reportReview, postReview } = require('../queries');


module.exports = {

  getReviews: ({ product_id, sort, page, count }) => {
    let offset = count * page - count;

    if (sort === 'newest') {
      sort = 'R.date DESC'
    } else if (sort === 'helpfulness') {
      sort = 'R.helpfulness DESC'
    } else if (sort === 'relevant') {
      sort = 'R.helpfulness DESC'
    }

    return pool.query(getReviews, [product_id, sort, count, offset])
      // .then(results => {
      //   res.send({
      //     "product": product_id,
      //     "page": Number(page),
      //     "count": Number(count),
      //     "results": results.rows
      //   })
      // })
      // .catch(error => {
      //   console.log(error);
      //   res.sendStatus(500);
      // })
  }
}