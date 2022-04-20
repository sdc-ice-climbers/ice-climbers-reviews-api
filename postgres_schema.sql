CREATE DATABASE ratings_reviews;

\c ratings_reviews;


-- ---
-- Table products
--
-- ---

DROP TABLE IF EXISTS products;

CREATE TABLE products (
  uniq_prod_id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
);

-- ---
-- Table reviews
--
-- ---


DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
  id SERIAL,
  uniq_prod_id INT NOT NULL REFERENCES products (uniq_prod_id),
  review_id INT NOT NULL PRIMARY KEY,
  date DATE NOT NULL,
  summary VARCHAR(100) NOT NULL,
  rating INT NOT NULL,
  body VARCHAR(1000) NOT NULL,
  recommend BOOLEAN,
  helpfulness INT,
  reviewer_name VARCHAR(60) NOT NULL,
  reported BOOLEAN DEFAULT FALSE,
  response VARCHAR(1000) DEFAULT NULL,
);

-- ---
-- Table meta_ratings_and_recommended
--
-- ---

DROP TABLE IF EXISTS meta_ratings_and_recommended;

CREATE TABLE meta_ratings_and_recommended (
  uniq_prod_id INT NOT NULL REFERENCES products(uniq_prod_id),
  rating_1 INT,
  rating_2 INT,
  rating_3 INT,
  rating_4 INT,
  rating_5 INT,
  recommend_true INT,
  recommend_false INT
);

-- ---
-- Table Photos
--
-- ---

DROP TABLE IF EXISTS photos;

CREATE TABLE photos (
  photo_id SERIAL,
  review_id INT NOT NULL REFERENCES reviews(review_id),
  url VARCHAR
);

-- ---
-- Table meta_characteristics
--
-- ---

DROP TABLE IF EXISTS meta_characteristics;

CREATE TABLE meta_characteristics (
  uniq_prod_id INT NOT NULL REFERENCES products(uniq_prod_id),
  characteristic_id INT,
  characteristic_value VARCHAR(50),
  PRIMARY KEY (uniq_prod_id)
);


