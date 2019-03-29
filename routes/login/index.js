const routes = require('express').Router()
const {
  User
} = require('../../models')

routes.get('/', (req, res) => {
  res.render('home/login')
})

routes.post('/', (req, res) => {
  let datauser;
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then( foundUser => {
      if(!foundUser){
        res.redirect('/login')
      }
      datauser = foundUser
      return foundUser.checkLogin(req.body.password)
    })
    .then( data=> {
      if(data === true) {
        req.session.login = {
          id : datauser.id,
          email : datauser.email,
          username : datauser.username,
        }
        res.locals.login = req.session.login
        res.redirect('/')
      } else {
        res.redirect('login')
      }

    })
    .catch( err => {
      res.send(err.message)
    })
})



module.exports = routes