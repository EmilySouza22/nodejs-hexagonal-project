const jwt = require('jsonwebtoken')

const makeTokenService = (secret) => ({
  sign: (payload) => jwt.sign(payload, secret, { expiresIn: '1d' }),
  verify: (token) => jwt.verify(token, secret),
})

module.exports = { makeTokenService }