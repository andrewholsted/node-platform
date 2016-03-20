'use strict';

let async = require('async');
let mongoose = require('mongoose');
let Channel = mongoose.model('Channel');

module.exports = function(done){
  let tasks = [
    createUser
  ];

  async.parallel(tasks, done);
};

function createUser(next){
  let params = {
    name: 'Andrew',
    email: 'andrew@fajitanachos.com'
  };

  Channel.create(params, next);
}
