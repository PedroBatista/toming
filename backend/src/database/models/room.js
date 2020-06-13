const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MUUID = require('uuid-mongodb');

const room = new Schema({
  _id: {
    type: String,
    default: () => MUUID.v4()
  },
  subject: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectID,
    ref: "User",
    required: true
  },
  //Para depois
  /*allowed_users: [{
    type: Schema.Types.ObjectID,
    ref: "User"
  }]*/
});

//Set any options for the schema
const options = {
  timestamps: true
}

//make the schema as a new instance of a mongoose schema, using our definition and options
const roomSchema = new mongoose.Schema(room, options)

module.exports = mongoose.model('Room', roomSchema)
