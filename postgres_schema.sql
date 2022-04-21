
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

-- ---
--
--
-- ---


DROP TABLE IF EXISTS characteristics;

CREATE TABLE characteristics (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  name VARCHAR NOT NULL
);





DROP TABLE IF EXISTS characteristic_reviews;

CREATE TABLE characteristic_reviews (
  id SERIAL,
  characteristic_id INT REFERENCES characteristics(id),
  review_id INT REFERENCES reviews(id),
  value INT
);




-- ---
-- Table Photos
--
-- ---

DROP TABLE IF EXISTS photos;

CREATE TABLE photos (
  id SERIAL,
  review_id INT NOT NULL REFERENCES reviews(id),
  url VARCHAR NOT NULL
);



-- ----

-- COPY reviews (id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) FROM '/Users/austinchapin/Desktop/HackReactor/reviews.csv' DELIMITER ',' CSV HEADER;

-- COPY characteristics (id, product_id, name) FROM '/Users/austinchapin/Desktop/HackReactor/characteristics.csv' DELIMITER ',' CSV HEADER;


-- COPY reviews_photos (id, review_id, url) FROM '/Users/austinchapin/Desktop/HackReactor/reviews_photos.csv' DELIMITER ',' CSV HEADER;

-- COPY characteristic_reviews (id, characteristic_id, review_id, value) FROM '/Users/austinchapin/Desktop/HackReactor/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;