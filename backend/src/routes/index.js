const express = require('express');
const router = express.Router();
const jitsiToken = require('../services/jiti-token-generation');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

router.get('/external-api', function (req, res, next) {
  res.render('external-api');
});

router.get('/jwt', function (req, res, next) {
  const token = jitsiToken.generate("Daniel Marmelo", "https://cutecatshq.com/wp-content/uploads/2014/05/Ozzy-Dating-Profile-Photo.-Hello-Ladies.jpg", "TestDemo1234567890");
  res.send(token);
});

module.exports = router;
