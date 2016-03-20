'use strict';

let mongoose = require('mongoose');
let nconf = require('nconf');
let url = nconf.get('database:url')

// Switch out native promise handler for bluebird
mongoose.Promise = require('bluebird');

// setup models out side of .init so they are available to other
// files we require().
mongoose.model('User', require('../models/user'));

module.exports = function initStorage(done){
  mongoose.connect(url);
  mongoose.connection.once('open', done);
  mongoose.connection.on('error', done);
};