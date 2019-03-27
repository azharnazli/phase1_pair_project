const routes = require('express').Router()
const { User } = require('../../models')

routes.get('/', (req, res)=> {
  res.render('home/register')
})

routes.post('/', (req, res)=> {
  User.create(req.body)
    .then( newUser => {
      res.redirect('/')
    })
    .catch(err => {
      res.send(err.message)
    })
})


module.exports = routes