const mongoose = require('mongoose');
const Schema = mongoose.Schema; //this is actually a ctor that creates a new schema

const appitemSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    genreTags: {
      type: [String], 
      required: true
    },
    images: {
        type: [String] //urls of images
    },
    description: {
        type: String,
        required: true
    },
    avgReviewScore: {
        type: Number
    },
    reviews: {
      type: [String], //ids of reviews
    }
  },
  { timestamps: true }
);

const Appitem = mongoose.model('Appitem', appitemSchema);
module.exports = Appitem;
