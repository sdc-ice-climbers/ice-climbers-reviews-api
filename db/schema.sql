
DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  rating INT NOT NULL,
  date BIGINT NOT NULL,
  summary VARCHAR(1000) NOT NULL,
  body VARCHAR(1000) NOT NULL,
  recommend BOOLEAN DEFAULT FALSE,
  reported BOOLEAN DEFAULT FALSE,
  reviewer_name VARCHAR(60) NOT NULL,
  reviewer_email VARCHAR(60) NOT NULL,
  response VARCHAR(1000) DEFAULT NULL,
  helpfulness INT
);


---------------------------------------------------------

DROP TABLE IF EXISTS characteristics;

CREATE TABLE characteristics (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  name VARCHAR NOT NULL
);

---------------------------------------------------------

DROP TABLE IF EXISTS characteristic_reviews;

CREATE TABLE characteristic_reviews (
  id SERIAL,
  characteristic_id INT REFERENCES characteristics(id),
  review_id INT REFERENCES reviews(id),
  value INT
);

---------------------------------------------------------

DROP TABLE IF EXISTS reviews_photos;

CREATE TABLE reviews_photos (
  id SERIAL,
  review_id INT NOT NULL REFERENCES reviews(id),
  url VARCHAR NOT NULL
);



