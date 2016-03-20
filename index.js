'use strict';

// Load our config before anything else
require('./config');

let nconf = require('nconf');
let numCPUs = nconf.get('server:workers') || require('os').cpus().length;
let cluster = require('cluster');
let server = require('./server');

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Exit event is fired whenever a worker process exits.
  cluster.on('exit', function(worker, code, signal) {
    // Restart the worker
    let newWorker = cluster.fork();

    console.log('worker ' + worker.process.pid + ' exited.', code || signal);
    console.log('worker ' + newWorker.process.pid + ' created.');
  });
} else {
  server.init(function(err){
    if(err){
      console.log(err);
      return;
    }
    
    console.log('server initialized')
  });
}
