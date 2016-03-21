'use strict';

let app = require('express')();
let methodOverride = require('method-override');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let cors = require('cors');
let mongoose = require('mongoose');
let nconf = require('nconf');
let session = require('express-session');
let MongoStore = require('connect-mongo')(session);    
let apiRoutes = require('./routes/api'); 
let errorRoutes = require('./routes/error');   
let port = nconf.get('server:port');          

module.exports = function initHttpServer(done){
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(cors());
  app.use(session({
    name: 'platform.api.sid',
    secret: nconf.get('http:sessionSecret'),
    rolling: true,
    saveUninitialized: true,
    resave: true,
    cookie: {
      maxAge: 86400000 * 14, // 2 weeks
      path: '/'
    },
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    })
  }));
  app.use(apiRoutes);
  app.use(errorRoutes);
  app.listen(port);
  done();
};