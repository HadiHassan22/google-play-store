const mongoose = require('mongoose');
const Schema = mongoose.Schema; //this is actually a ctor that creates a new schema
const ObjectId = Schema.Types.ObjectId;

const reviewSchema = new Schema(
  {
    appuserId: {
      type: ObjectId,
      required: true,
    },
    itemId: {
      type: ObjectId,
      required: true,
    },
    text: {
      type: String,
      default: '',
    },
    score: {
      type: Number,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
