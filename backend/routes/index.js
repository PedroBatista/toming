var express = require('express');
var router = express.Router();




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/external-api', function(req, res, next) {
  res.render('external-api');
});

module.exports = router;
