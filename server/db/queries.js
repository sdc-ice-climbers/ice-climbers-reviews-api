// GET REVIEWS
const getReviews = `
      SELECT
        R.id as review_id,
        R.rating,
        R.summary,
        R.recommend,
        R.response,
        R.body,
        TO_TIMESTAMP(R.date/1000) date,
        R.reviewer_name,
        R.helpfulness,
          (
            SELECT array_to_json(coalesce(array_agg(photo), array[]::record[]))
            FROM
            (
              SELECT RP.id, RP.url
              FROM
              reviews R2 INNER JOIN reviews_photos RP
              ON R2.id = RP.review_id
              WHERE RP.review_id = R.id) photo
            ) photos
        FROM reviews R
        WHERE
        (R.product_id = $1 AND R.reported = false)
      $2
      LIMIT $3
      OFFSET $4`

// ------------------------------------------------------------

// GET REVIEW META DATA
const getMetaData = `
SELECT
  R1.product_id,
  (
  SELECT
    json_object_agg(ALIAS2.rating, coalesce(ALIAS2.count, '0')) as ratings
  FROM
    (
    SELECT
      empty.rating, alias.count
    FROM
      (
      temp_ratings empty FULL OUTER JOIN (SELECT R.rating, CAST(COUNT(*) as text)
      FROM
      reviews R WHERE R.product_id = R1.product_id GROUP BY R.rating) alias USING (rating)
      )
    )
    ALIAS2
  ),
  json_build_object
  (
    'false',
    count(R1.recommend) - sum(R1.recommend::int),
    'true',
    sum(R1.recommend::int)) as Recommended,
    (
    SELECT
        json_object_agg(alias2.name, alias2.json_build_object) as characteristics
      FROM
        (
        SELECT
          alias.name, json_build_object('id', alias.id, 'value', alias.value)
          FROM
          (
          SELECT
            C.name,
            C.id,
            AVG(CR.value)::NUMERIC(10,2) AS value
          FROM
            characteristics C INNER JOIN characteristic_reviews CR
          ON
            C.id = CR.characteristic_id
          WHERE
            C.product_id = R1.product_id
          GROUP BY
            C.id
          )
          alias
        )
        alias2
  )
  FROM
    reviews R1
  WHERE
    R1.product_id = $1
  GROUP BY
    R1.product_id;`

// ------------------------------------------------------------
// MARK REVIEW  HELPFUL

  const helpfulQuery = `UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = $1;`



// ------------------------------------------------------------
// MARK REVIEW REPORTED

  const reportQuery = `UPDATE reviews SET reported = true WHERE id = $1;`


  // PHOTOS

  // 'SELECT id, url FROM reviews_photos where review_id = 115816';

  // const insertReview = 'INSERT INTO id, product_id, rating, TO_TIMESTAMP(date/1000) date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness FROM reviews where product_id = 5;'

    module.exports = {
      getReviews,
      getMetaData,
      helpfulQuery,
      reportQuery
    };