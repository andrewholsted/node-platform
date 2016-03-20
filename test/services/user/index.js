'use strict';

let expect = require('chai').expect;
let seed = require('./seed');
let usersService = require('../../../server/services/user');
let mongoose = require('mongoose');
let Channel = mongoose.model('User');

describe('Channel Service', function() {
  beforeEach(seed);

  describe('.createUser()', function(){

    it('should fail if an email is not provided', function(done){
      let params = {};

      usersService.createUser(params, function(err){
        expect(err).to.equal('Please provide an email.');
        done();
      });
    });

    it('should fail with a duplicate email', function(done){
      let params = {
        email: 'andrew@fajitanachos.com'
      };

      usersService.createUser(params, function(err){
        expect(err).to.equal('A user with that email already exists.');
        done();
      });
    });

    it('should create a new channel', function(done){
      let params = {
        name: 'Andrew',
        email: 'andrew.holsted@gmail.com'
      };

      usersService.createUser(params, function(err, result){
        expect(result.email).to.equal(params.email);
        done();
      });
    });
  });
});
