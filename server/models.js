const Pool = require('pg').Pool
const pool = new Pool({
  user: 'austinchapin',
  host: 'localhost',
  database: 'ratings_reviews',
  port: 5432
})

const { getReviews, getMetaData, helpfulReview, reportReview, postReview, postPhotos, postCharacteristics } = require('./queries.js');


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




  postReview: ( { product_id, rating, summary, body, name, email, photos, characteristics } ) => {
    return pool.query(postReview, [product_id, rating, summary, body, name, email])
      .then(results => {

        let review_id = results.rows[0].id;
        console.log(characteristics);

        // pool.query(postPhotos, [Array(photos.length).fill(review_id), photos])
        //   .then(results => console.log('Review photo(s) posted'))
        //   .catch(error => console.log('Failed photo post'))

        // pool.query(postCharacteristics, [Object.keys(characteristics), Array(Object.keys(characteristics).length).fill(review_id), Object.values(characteristics)] )
        //   .then(results => console.log('Characteristics posted'))
        //   .catch(error => console.log("Characteristics post failed"))
      })
      // .then(results => {
      //   console.log('HELLO')
      //   pool.query(postCharacteristics, [Object.keys(characteristics), Array(Object.keys(characteristics).length).fill(review_id), Object.values(characteristics)] )
      //     .then(results => console.log('Characteristics posted'))
      //     .catch(error => console.log("character post failed"))
      // })
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