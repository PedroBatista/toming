const jwt = require('jsonwebtoken');

function generate(userName, room, userAvatar) {
  // https://github.com/jitsi/lib-jitsi-meet/blob/master/doc/tokens.md
  // https://github.com/auth0/node-jsonwebtoken

  if (!userAvatar) {
    userAvatar = process.env.APP_SERVER_URL +
      process.env.DEFAULT_AVATAR_PATH +
      Math.floor(Math.random() * process.env.DEFAULT_AVATAR_COUNT) +
      process.env.DEFAULT_AVATAR_EXTENSION;
  }

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

module.exports = {
  generate
};
