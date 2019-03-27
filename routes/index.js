const routes = require('express').Router()
const register = require('./register')
const login = require('./login')
const logout = require('./logout')
const users = require('./users')
const upload = require('./upload')



const session = require('../middlewares/session')

routes.use(session)

routes.get('/', (req, res)=> {
  res.render('home/homepage')
})



routes.get('/session', (req, res)=> {
  res.send(req.session)
})

routes.use('/upload', upload)
routes.use('/register', register)
routes.use('/login', login)
routes.use('/logout', logout)
routes.use('/users', users)


module.exports =  routes
