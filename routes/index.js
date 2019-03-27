const routes = require('express').Router()
const register = require('./register')
const login = require('./login')
const logout = require('./logout')
const users = require('./users')
const upload = require('./upload')
const image = require('./image')

const { User, Image } = require('../models')


routes.get('/', (req, res)=> {
  User.findAll({
    include:[Image]
  })
    .then( allUser => {
      // res.send(allUser)
      res.render('home/homepage', { allUser })
    })
    .catch( err => {
      res.send(err.message)
    })
  
})


routes.get('/session', (req, res)=> {
  res.send(req.session)
})

routes.use('/upload', upload)
routes.use('/register', register)
routes.use('/login', login)
routes.use('/logout', logout)
routes.use('/users', users)
routes.use('/image', image)


module.exports =  routes
