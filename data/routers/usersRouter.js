const express = require('express')
const Users = require('../helpers/usersDb')
const restricted = require('../auth/restricted-middleware.js')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../../config/secrets')

router.get('/', restricted, async (req, res) => {
  if (req.session && !req.session.user) {
    return res.status(401).json({ error: 'You shall not pass!' })
  } else
    try {
      const users = await Users.getUsers()
      res.status(200).json(users)
    } catch (error) {
      res.status(500).json({ error })
    }
})
router.get('/logout', (req, res) => {
  if (req.session)
    req.session.destroy(err => {
      if (err) res.send('You can never leave')
      else res.send('Bye bye')
    })
  else res.end()
})
router.get('/:id', restricted, async (req, res) => {
  const { id } = req.params
  if (req.session && !req.session.user) {
    return res.status(401).json({ error: 'You shall not pass!' })
  } else
    try {
      const user = await Users.getUser(id)
      user
        ? res.status(200).json(user)
        : res.status(404).json({ error: 'User not found' })
    } catch (error) {
      res.status(500).json({ error })
    }
})
router.post('/register', async (req, res) => {
  const { body } = req
  if (body && body.username && body.password && body.department) {
    const hash = bcrypt.hashSync(body.password, 14)
    body.password = hash
    try {
      const id = await Users.addUser(body)
      res.status(201).json(id)
    } catch (error) {
      res.status(500).json({ error })
    }
  } else
    res
      .status(500)
      .json({ error: 'Please provide a username and password and department' })
})
router.post('/login', async (req, res) => {
  const { body } = req
  if (body && body.username && body.password) {
    const user = await Users.findUser(body)
    if (
      !user ||
      !bcrypt.compareSync(body.password, user.password) ||
      (req.session && !req.session.user)
    ) {
      return res.status(401).json({ error: 'You shall not pass!' })
    } else {
      try {
        const token = generateToken(user)
        req.session.user = user
        const users = await Users.getUsers()
        res.status(200).json({ token, users })
      } catch (error) {
        res.status(500).json({ error })
      }
    }
  } else
    res.status(500).json({ error: 'Please provide a username and password' })
})
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const deleted = await Users.removeUser(id)
    deleted
      ? res.status(200).json(deleted)
      : res.status(404).json({ error: 'User not found' })
  } catch (error) {
    res.status(500).json({ error })
  }
})

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  }
  const options = {
    expiresIn: '1d'
  }
  return jwt.sign(payload, jwtSecret, options)
}

module.exports = router
