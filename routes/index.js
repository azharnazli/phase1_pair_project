const routes = require('express').Router()
const register = require('./register')
const login = require('./login')
const logout = require('./logout')
const users = require('./users')
const upload = require('./upload')
const image = require('./image')
const tags = require('./tags')

const { User, Image, Comment, profileImage, Tag} = require('../models')


routes.get('/', (req, res) => {
  // if(!res.locals.login) {
  //   res.locals.login = 0
  // }
  Image.findAll({
      include: [{
        model: User,
        include:[profileImage]
      }, {
        model: Comment,
        include: [User]
      },{
        model: Tag
      }],
      order: [['createdAt','DESC']]
    })
    .then(allImage => {
      // res.send(allImage)
      res.render('home/feed', { allImage })
    })
    .catch(err => {
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
routes.use('/tags', tags)


module.exports = routes