const Pool = require('pg').Pool
const pool = new Pool({
  user: 'austinchapin',
  host: 'localhost',
  database: 'ratings_reviews',
  port: 5432
})

// GET REVIEWS
const selectQuery = `SELECT R.id as review_id, R.rating, R.summary, R.recommend, R.response, R.body, TO_TIMESTAMP(R.date/1000) date, R.reviewer_name, R.helpfulness,
  (SELECT array_to_json(coalesce(array_agg(photo), array[]::record[])) FROM
  (SELECT RP.id, RP.url FROM
  reviews R2 INNER JOIN reviews_photos RP
  ON R2.id = RP.review_id
  WHERE RP.review_id = R.id) photo) photos
  FROM reviews R WHERE
  (R.product_id = 40349 AND R.reported = false)`
  // NEED TO ADD PAGE, COUNT, FILTER



  // const recommend = `SELECT json_build_object('false', count(R2.recommend) - sum(R2.recommend::int), 'true', sum(R2.recommend::int)) as Recommended FROM reviews R2 WHERE R2.product_id = 54550;`

  // const characteristics = `SELECT json_object_agg(alias2.name, alias2.json_build_object) as characteristics FROM (SELECT alias.name, json_build_object('id', alias.id, 'value', alias.value) FROM (SELECT C.name, C.id, AVG(CR.value)::NUMERIC(10,2) AS value FROM characteristics C INNER JOIN characteristic_reviews CR ON C.id = CR.characteristic_id WHERE C.product_id = 5000 GROUP BY C.id) alias) alias2;`

// REVIEW META DATA
  const test3 = `SELECT R1.product_id, json_build_object('false', count(R1.recommend) - sum(R1.recommend::int), 'true', sum(R1.recommend::int)) as Recommended, (SELECT json_object_agg(alias2.name, alias2.json_build_object) as characteristics FROM (SELECT alias.name, json_build_object('id', alias.id, 'value', alias.value) FROM (SELECT C.name, C.id, AVG(CR.value)::NUMERIC(10,2) AS value FROM characteristics C INNER JOIN characteristic_reviews CR ON C.id = CR.characteristic_id WHERE C.product_id = 5000 GROUP BY C.id) alias) alias2) FROM reviews R1 WHERE R1.product_id = 54550 GROUP BY R1.product_id;`


// RATINGS IN ORDER BY PRODUCT ID
// SELECT id, product_id, rating FROM reviews where product_id = 5000 GROUP BY reviews.id ORDER BY reviews.rating ASC

// 'SELECT id, url FROM reviews_photos where review_id = 115816';

// const insertReview = 'INSERT INTO id, product_id, rating, TO_TIMESTAMP(date/1000) date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness FROM reviews where product_id = 5;'

module.exports = {

  testQuery: (req, res) => {
    pool.query(test3)
      .then(results => res.json(results.rows[0]))
      .catch(error => {
        console.log(error);
        res.sendStatus(500);
      })
  },


  // -----------------------------------------------


  getReviews: (req, res) => {
    const { product_id, page, count, sort } = req.query;
    pool.query(selectQuery)
      .then(results => res.json(results.rows[0]))
      .catch(error => {
        console.log(error);
        res.send(500);
      })
  },


  getReviewsMeta: (req, res) => {
    const { product_id }= req.query;
     pool.query(metaQuery)
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
    const helpfulQuery = `UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = ${review_id};`

    pool.query(helpfulQuery)
      .then(results => res.send(200))
      .catch(error => {
        console.log(error);
        res.send(500);
      })
  },


  reportReview: (req, res) => {
    const { review_id } = req.params;
    const reportQuery = `UPDATE reviews SET reported = true WHERE id = ${review_id};`

    pool.query(reportQuery)
      .then(result => res.send(200))
      .catch(error => {
        console.log(error);
        res.send(500);
      })
  }
}