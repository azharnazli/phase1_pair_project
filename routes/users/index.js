const routes = require('express').Router()
const { User, Image } = require('../../models')

routes.get('/profile', (req, res)=> {
    if(!req.session.login) {
      res.redirect('/')
    }
    User.findByPk(req.session.login.id,{
      include : [Image]
    })
      .then( user => {
        // res.send(user)
        res.render('users/profile', { user })
      })
      .catch(err => {
        res.send(err)
      })
})





module.exports = routes