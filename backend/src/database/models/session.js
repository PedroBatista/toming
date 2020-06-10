const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MUUID = require('uuid-mongodb');

const session = new Schema({
  _id: {
    type: String,
    default: MUUID.v4()
  },
  user: {
    type: Schema.Types.ObjectID,
    ref: "User",
    required: true
  }
});

//Set any options for the schema
const options = {
  timestamps: true
}

//make the schema as a new instance of a mongoose schema, using our definition and options
const sessionSchema = new mongoose.Schema(session, options)

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
