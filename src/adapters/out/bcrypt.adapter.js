const bcrypt = require('bcrypt')

const makePasswordService = () => ({
  hash: (password) => bcrypt.hash(password, 10),
  compare: (password, hash) => bcrypt.compare(password, hash),
})

module.exports = { makePasswordService }