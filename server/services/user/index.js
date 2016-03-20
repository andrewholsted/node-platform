'use strict';
let mongoose = require('mongoose');
let User = mongoose.model('User');
let moment = require('moment');

// Private Methods




// Public Methods

module.exports = {
  createUser: createUser,
  updateUser: updateUser,
  deleteUser: deleteUser
}

function createUser(params) {
  if(!params.email){
    done('Please provide a user email.');
    return;
  }

  return User.findOne({email: email})
    .tap(function preventDuplicateUsers(user){
      if(user){
        throw new Error('A user with that email already exists');
      }
    })
    .then(function createNewUser(){
      let params = {
        email: params.email,
        createdAt: moment().format(),
        updatedAt: moment().format();
      };

      return User.create(params);
    });
}

function updateUser(userId, params) {
  if(!userId){
    throw new Error('Please provide a User id.');
  }

  let options = { new: true };

  return User.findByIdAndUpdate(userId, params, options, done);
}

function deleteUser(userId, done) {
  if(!userId){
    throw new Error('Please provide a user id');
  }
    
  return User.findByIdAndRemove(params.id, done);
}