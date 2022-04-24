const mongoose = require('mongoose');

main().catch(err => console.error(err));

// async function main() {
//   await mongoose.connect('mongodb://localhost:27017/test');
// }


const photo = mongoose.schema({
  photo_id: Number,
  review_id: Number,
  url: String
})

const review = mongoose.schema({
  product_id: Number,
  review_id: Number,
  summary: String,
  body: String,
  rating: Number,
  recommend: Boolean,
  reported: Boolean,
  response: {type: String, default: null},
  helpfulness: Number,
  reviewer_name: String,
  photos: [photo]
})

const review_meta_data = mongoose.schema({
  product_id: Number,
  rating_1: Number,
  rating_2: Number,
  rating_3: Number,
  rating_4: Number,
  rating_5: Number,
  recommend_true: Number,
  recommend_false: Number,
  fit_id: Number,
  fit_val: String,
  length_id: Number,
  length_val: String,
  comfort_id: Number,
  comfort_val: String,
  quality_id: Number,
  quality_val: String
})