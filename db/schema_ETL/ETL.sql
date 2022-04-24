-- MIRGATE DATA FROM CSV FILES

`COPY reviews (id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) FROM '/Users/austinchapin/Desktop/HackReactor/reviews.csv' DELIMITER ',' CSV HEADER;`

`COPY characteristics (id, product_id, name) FROM '/Users/austinchapin/Desktop/HackReactor/characteristics.csv' DELIMITER ',' CSV HEADER;`


`COPY reviews_photos (id, review_id, url) FROM '/Users/austinchapin/Desktop/HackReactor/reviews_photos.csv' DELIMITER ',' CSV HEADER;`

`COPY characteristic_reviews (id, characteristic_id, review_id, value) FROM '/Users/austinchapin/Desktop/HackReactor/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;`


-- NEW TABLE WITH TIMESTAMP DATA TYPE

CREATE TABLE NEWreviews (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  rating INT NOT NULL,
  date TIMESTAMP NOT NULL,
  summary VARCHAR(1000) NOT NULL,
  body VARCHAR(1000) NOT NULL,
  recommend BOOLEAN DEFAULT FALSE,
  reported BOOLEAN DEFAULT FALSE,
  reviewer_name VARCHAR(60) NOT NULL,
  reviewer_email VARCHAR(60) NOT NULL,
  response VARCHAR(1000) DEFAULT NULL,
  helpfulness INT
);

-- TRANSFER OLD REVIEWS TABLE WITH BIGINT DATE TO NEW TABLE WITH TIMESTAMP

INSERT INTO NEWreviews (
  id,
  product_id,
  rating,
  date,
  summary,
  body,
  recommend,
  reported,
  reviewer_name,
  reviewer_email,
  response,
  helpfulness
)
SELECT
  old.id as id,
  old.product_id as product_id,
  old.rating as rating,
  TO_TIMESTAMP(old.date / 1000) as date,
  old.summary as summary,
  old.body as body,
  old.recommend as recommend,
  old.reported as reported,
  old.reviewer_name as reviewer_name,
  old.reviewer_email as reviewer_email,
  old.response as response,
  old.helpfulness as helpfulness

FROM
  ( SELECT
    id,
    product_id,
    rating,
    date,
    summary,
    body,
    recommend,
    reported,
    reviewer_name,
    reviewer_email,
    response,
    helpfulness FROM reviews) old
  ON CONFLICT DO NOTHING;