const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Users = require('../helpers/usersDb')
const { jwtSecret } = require('../../config/secrets')

module.exports = (req, res, next) => {
  const token = req.headers.authorization
  if (token)
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) res.status(401).json({ err: 'user not verified' })
      else {
        req.decodedJwt = decodedToken
        next()
      }
    })
  else res.status(401).json({ err: 'user not verified' })
}
