var jwt = require('jsonwebtoken');

function generate(userName, userAvatar, room) {
  // https://github.com/jitsi/lib-jitsi-meet/blob/master/doc/tokens.md
  // https://github.com/auth0/node-jsonwebtoken

  let payload = {
    "context": {
      "user": {
        "avatar": userAvatar || "",
        "name": userName || "",
      },
    },
    "aud": "toming-users",
    "iss": process.env.JITSI_APP_ID,
    "sub": process.env.JITSI_SERVER_DOMAIN,
    "room": room || ""
  };

  let options = {
    algorithm: 'HS256',
    expiresIn: '15m',
  };

  return jwt.sign(payload, process.env.JITSI_APP_SECRET, options);
}

module.exports =  {
  generate
};
