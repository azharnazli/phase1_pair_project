const routes = require('express').Router()
const {
  User
} = require('../../models')



routes.get('/', (req, res) => {
  let error;
  if(req.query.err) {
    error = req.query.err
  }
  res.render('home/register', {error})
})

routes.post('/', (req, res) => {
  User.create(req.body)
    .then(newUser => {
      res.redirect('/')
    })
    .catch(err => {
      let error = err.errors.map(el => el.message)
      res.redirect(`/register?err=${error}`)
    })
})


module.exports = routes