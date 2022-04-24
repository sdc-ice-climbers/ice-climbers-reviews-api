const Pool = require('pg').Pool
const pool = new Pool({
  user: 'austinchapin',
  host: 'localhost',
  database: 'ratings_reviews',
  port: 5432
})

const { getReviews, getMetaData, helpfulReview, reportReview, postReview } = require('./queries.js');


module.exports = {

  getReviews: ({ product_id, sort, page, count }) => {
    const offset = count * page - count;

    if (sort === 'newest') {
      sort = 'R.date DESC'
    } else if (sort === 'helpfulness') {
      sort = 'R.helpfulness DESC'
    } else if (sort === 'relevant') {
      sort = 'R.helpfulness DESC'
    }

    return pool.query(getReviews, [product_id, sort, count, offset])
      .then(results => {
        return results
      })
      .catch(error => {
        return error
        console.log(error);
      })
  },




  getMetaData: ({product_id}) => {
    return pool.query(getMetaData, [product_id])
      .then(results => {
        return results
      })
      .catch(error => {
        return error
      })
  },




  postReview: ( { product_id, rating, summary, body, name, email } ) => {
    return pool.query(postReview, [product_id, rating, summary, body, name, email])
      .then(results => {
        return results
      })
      .catch(error => {
         return error
      });
  },


  helpfulReview: ({ review_id }) => {


    return pool.query(helpfulReview, [review_id])
      .then(results => {
        return results
      })
      .catch(error => {
        return error
      })
  },


  reportReview: ({ review_id }) => {
    return pool.query(reportReview, [review_id])
      .then(results => {
        return results
      })
      .catch(error => {
        return error
      })
  }
}