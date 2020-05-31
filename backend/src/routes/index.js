var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

router.get('/external-api', function (req, res, next) {
  res.render('external-api');
});

router.get('/jwt', function (req, res, next) {
  /*{
    "kid": "jitsi/custom_key_name",
    "typ": "JWT",
    "alg": "RS256"
  }*/
  let key = "shhhhhhh";

  let payload = {
    "context": {
      "user": {
        "avatar": "https:/gravatar.com/avatar/abc123",
        "name": "John Doe",
        "email": "jdoe@example.com",
        "id": "abcd:a1b2c3-d4e5f6-0abc1-23de-abcdef01fedcba"
      },
      "group": "a123-123-456-789"
    },
    "aud": "jitsi",
    "iss": "my_client",
    "sub": "meet.jit.si",
    "room": "*",
    "exp": 1500006923
  };

  let options = {
    algorithm: 'HS256',
    //expiresIn: '1h',
    header: {
      kid: 'jitsi/custom_key_name'
    }
  };

  let token = jwt.sign(payload, key, options);
  //let token = jwt.sign(payload, privateKey, options);
  res.send(token);
});

module.exports = router;
