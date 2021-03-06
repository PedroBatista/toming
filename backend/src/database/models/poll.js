const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const poll = new Schema({
  question: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectID,
    ref: "User",
    required: true
  },
  already_voted_users: [{
    type: Schema.Types.ObjectID,
    ref: "User"
  }],
  options: [{
    text: String,
    vote_count: Number
  }],
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
const pollSchema = new mongoose.Schema(poll, options)

module.exports = mongoose.model('Poll', pollSchema)
