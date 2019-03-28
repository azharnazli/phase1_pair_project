const routes = require('express').Router()
const register = require('./register')
const login = require('./login')
const logout = require('./logout')
const users = require('./users')
const upload = require('./upload')
const image = require('./image')

const { User, Image, Comment} = require('../models')


routes.get('/', (req, res) => {
  Image.findAll({
      include: [{
        model: User
      }, {
        model: Comment,
        include: [User]
      }],
      order: [['createdAt','DESC']]
    })
    .then(allImage => {
      // res.send(allImage)
      // console.log(allImage[0].User.lastname)
      res.render('home/feed', { allImage })
    })
    .catch(err => {
      res.send(err.message)
    })

})


// routes.get('/session', (req, res)=> {
//   res.send(req.session)
// })

routes.use('/upload', upload)
routes.use('/register', register)
routes.use('/login', login)
routes.use('/logout', logout)
routes.use('/users', users)
routes.use('/image', image)


module.exports = routes