// Import all the models.
const User = require('./user')
const Room = require('./room')
const Pool = require('./poll')

// Export them in a bundle
module.exports = {
  User,
  Room,
  Pool
}
