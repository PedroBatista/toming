var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var room = new Schema({
  //se calhar o id gerado pelo MongoDb é suficiente
  //id : { type: Date, default: gerar uuid }, //nao sei se este ID pode ser o do Jitsi
  subject:  { type: String, required: true  },
  author: {type: Schema.Types.ObjectID, ref: "User"},

  //created_at: { type: Date, default: Date.now },

  //Para depois,
  //allowed_users: [{type: Schema.Types.ObjectID, ref: "User"}],
});

//Set any options for the schema
const options = {
  timestamps: true
}

//make the schema as a new instance of a mongoose schema, using our definition and options
const roomSchema = new mongoose.Schema(room, options)

//export that boye
module.exports = mongoose.model('Room', roomSchema)

