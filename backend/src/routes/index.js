const express = require('express');
const router = express.Router();
const jitsiToken = require('../services/jiti-token-generation');

let RoomModel = require("../database/models/room.js")
let User = require("../database/models/user.js")


/* GET home page. */
router.get('/', async function (req, res, next) {

  var u = await User.findOne({ email: 'luvl@mail.com'}).exec();

  console.log("User: " + u)


  var r = new RoomModel();
  r.subject = "Global Lobotomy 2";
  r.author = u;
  r.save();


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
