'use strict';

let express = require('express');
let router = express.Router();

router.use(function handle404(req, res, next) {
  res.status(404).send({error: 'not found'});
});

module.exports = router;