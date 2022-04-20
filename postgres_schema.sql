CREATE DATABASE ratings_reviews;

\c ratings_reviews;

DROP TABLE IF EXISTS products;

CREATE TABLE products (
  uniq_prod_id SERIAL NOT NULL PRIMARY KEY,
  product_id INT NOT NULL,
);


DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
  id SERIAL NOT NULL,
  uniq_prod_id INT NOT NULL REFERENCES products (uniq_prod_id),
  review_id INT NOT NULL,
  date DATE NOT NULL,
  summary VARCHAR(100),
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
  rating_1 INT NULL DEFAULT NULL,
  rating_2 INT NULL DEFAULT NULL,
  rating_3 INT NULL DEFAULT NULL,
  rating_4 INT NULL DEFAULT NULL,
  rating_5 INT NULL DEFAULT NULL,
  recommend_true INT NULL DEFAULT NULL,
  recommend_false INT NULL DEFAULT NULL
);

-- ---
-- Table Photos
--
-- ---

DROP TABLE IF EXISTS photos;

CREATE TABLE photos (
  photo_id SERIAL NOT NULL,
  review_id INT NOT NULL REFERENCES reviews(review_id),
  url VARCHAR
);

-- ---
-- Table meta_characteristics
--
-- ---

DROP TABLE IF EXISTS meta_characteristics;

CREATE TABLE meta_characteristics (
  uniq_prod_id INT NULL AUTO_INCREMENT DEFAULT NULL,
  characteristic_id INT NULL DEFAULT NULL,
  characteristic_value VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (uniq_prod_id)
);


