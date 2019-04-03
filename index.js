const express = require('express')
const helmet = require('helmet')
const server = express()
const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session)
const UsersRouter = require('./data/routers/usersRouter')
const cors = require('cors')

const PORT = 9090
const sessionOptions = {
  name: 'shrimp',
  secret: 'not a secret',
  cookie: {
    maxAge: 1000 * 60 * 60, // hour
    secure: false
  },
  httpOnly: true,
  resave: false,
  saveUninitialized: false,
  store: new KnexSessionStore({
    knex: require('./dbConfig'),
    tablename: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 60 //hour
  })
}

var whitelist = ['http://localhost:3000/']
var corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

server.use(session(sessionOptions))
server.use(helmet())
server.use(express.json())
server.use(cors(corsOptions))
server.use('/api/users', UsersRouter)

server.get('/', (req, res) => res.send('<h2>Welcome to the API</h2>'))

server.listen(PORT, _ => console.log('Listening on port ' + PORT))
