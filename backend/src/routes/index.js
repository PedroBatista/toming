const express = require('express');
const authRouter = require('./auth.route');
const usersRouter = require('./users');
const roomsRouter = require('./rooms');
const {User, Room} = require("../database/models");
const jitsiToken = require('../services/jiti-token-generation');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/rooms', roomsRouter);


/* GET home page. */
router.get('/', async function (req, res, next) {

  var u = await User.findOne({email: 'luvl@mail.com'}).exec();

  console.log("User: " + u)


  var r = new Room();
  r.subject = "Global Lobotomy 2";
  r.author = u;
  r.save();


  res.render('index', {title: 'Express'});
});

router.get('/external-api', function (req, res, next) {
  res.render('external-api');
});

router.get('/jwt', function (req, res, next) {
  const token = jitsiToken.generate("Daniel Marmelo", "*");
  //const token = jitsiToken.generate("Daniel Marmelo", "*", "https://cutecatshq.com/wp-content/uploads/2014/05/Ozzy-Dating-Profile-Photo.-Hello-Ladies.jpg");
  //const token = jitsiToken.generate("Pedro Batista", "*", "https://sp.apolloboxassets.com/vendor/product/2019-01-15-09/productImages/rpE8tArray_4.jpg");
  res.send(token);
});

module.exports = router;
