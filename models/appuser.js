const mongoose = require('mongoose');
const Schema = mongoose.Schema; //this is actually a ctor that creates a new schema
const ObjectId = Schema.Types.ObjectId;

const appuserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: ''
    }
    ,
    library: {
      type: [ObjectId], //ids 
    },
    wishlist: {
      type: [ObjectId],
    },
  },
  { timestamps: true }
);

const Appuser = mongoose.model('Appuser', appuserSchema);
module.exports = Appuser;
