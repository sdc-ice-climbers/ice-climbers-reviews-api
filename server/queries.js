// ------------------------------------------------------------
// GET REVIEWS
// ------------------------------------------------------------

const getReviews = `
      SELECT
        R.id as review_id,
        R.rating,
        R.summary,
        R.recommend,
        R.response,
        R.body,
        R.date,
        R.reviewer_name,
        R.helpfulness,
          (
          SELECT
            array_to_json(coalesce(array_agg(photo), array[]::record[]))
            FROM
              (
              SELECT
                RP.id, RP.url
              FROM
                reviews R2 INNER JOIN reviews_photos RP
              ON
                R2.id = RP.review_id
              WHERE
                RP.review_id = R.id
              ) photo
          ) photos
      FROM
        reviews R
      WHERE
        (R.product_id = $1 AND R.reported = false)
      ORDER BY $2
      LIMIT $3
      OFFSET $4;`



// ------------------------------------------------------------
// GET REVIEW META DATA
// ------------------------------------------------------------
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
// ------------------------------------------------------------
  const helpfulReview = `UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = $1;`



// ------------------------------------------------------------
// MARK REVIEW REPORTED
// ------------------------------------------------------------
  const reportReview = `UPDATE reviews SET reported = true WHERE id = $1;`



// ------------------------------------------------------------
// POST REVIEW
// ------------------------------------------------------------
  const postReview = `
            INSERT INTO reviews
              (
              product_id,
              rating,
              date,
              summary,
              body,
              reviewer_name,
              reviewer_email,
              helpfulness
              )
            VALUES
              ($1, $2, current_timestamp, $3, $4, $5, $6, 0)
              RETURNING id;
  `


// ------------------------------------------------------------
// PHOTOS
// ------------------------------------------------------------
  const postPhotos = `
            INSERT INTO reviews_photos
              (review_id, url)
            SELECT
              review_id,
              url
            FROM
            UNNEST
              ($1::int[], $2::text[]) AS alias
              (review_id, url)`



// ------------------------------------------------------------
// POST CHARACTERISTICS
// ------------------------------------------------------------
  const postCharacteristics = `
          INSERT INTO characteristic_reviews
            (characteristic_id, review_id, value)
          SELECT
            characteristic_id,
            review_id,
            value
          FROM
          UNNEST
            ($1::int[], $2::int[], $3::int[])
            AS alias
            (characteristic_id, review_id, value)`



// ------------------------------------------------------------
// EXPORTS
// ------------------------------------------------------------

    module.exports = {
      getReviews,
      getMetaData,
      helpfulReview,
      reportReview,
      postReview,
      postPhotos,
      postCharacteristics
    };
