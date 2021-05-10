const mongoose = require('mongoose');
const Schema = mongoose.Schema; //this is actually a ctor that creates a new schema
const ObjectId = Schema.Types.ObjectId;

const gameitemSchema = new Schema(
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
        type: [String]
    },
    description: {
        type: String,
        required: true
    },
    avgReviewScore: {
        type: Number
    },
    reviews: {
      type: [ObjectId], //ids of reviews
    },
    trailerVideo: {
        type: String //url
    }
  },
  { timestamps: true }
);

const Gameitem = mongoose.model('Gameitem', gameitemSchema);
module.exports = Gameitem;
