const mongoose = require('mongoose');
const Schema = mongoose.Schema; //this is actually a ctor that creates a new schema
const ObjectId = Schema.Types.ObjectId;

const bookitemSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    authors: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    genreTags: {
      type: [String],
      required: true,
    },
    image: {
      type: String, //url
    },
    description: {
      type: String,
      required: true,
    },
    avgReviewScore: {
      type: Number,
    },
    reviews: {
      type: [ObjectId], //ids of reviews
    },
  },
  { timestamps: true }
);

const Bookitem = mongoose.model('Bookitem', bookitemSchema);
module.exports = Bookitem;
