var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
var UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  }
});

var RequestSchema = new Schema({
  request: {
    type: String,
    unique: true,
    required: true
  },
  _creator: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  _create: {
    type: Date,
    default: Date.now
  },
  isComments: {
    type: Boolean,
    default: false

  }
});

var ResponseSchema = new Schema({
  response: {
    type: String,
    required: true
  },
  _creator: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  _request: {
    type: Schema.Types.ObjectId,
    ref: 'request'
  },
  _create: {
    type: Date,
    default: Date.now
  }
});

var user = Mongoose.model('user', UserSchema);
var request = Mongoose.model('request', RequestSchema);
var response = Mongoose.model('response', ResponseSchema);

module.exports = {
  User: user,
  Request: request,
  Response: response
};