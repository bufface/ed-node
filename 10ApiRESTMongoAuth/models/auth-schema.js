'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  AuthSchema = Schema({
    username: String,
    password: String
  }, {
    collection: 'auth'
  }),
  Auth = mongoose.model('Auth', AuthSchema);

module.exports = Auth;