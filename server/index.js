'use strict';

let async = require('async');
let storage = require('./storage');
let http = require('./http');

module.exports = {
	init: init
}

function init(done){
	var tasks = [
		storage,
    http
	];

	async.series(tasks, done);
};
