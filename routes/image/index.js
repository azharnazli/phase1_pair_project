const routes = require('express').Router()
const {
  Image,
  Comment,
  User
} = require('../../models')


routes.get('/:id', (req, res) => {
  Image.findByPk(req.params.id, {
      include: [{
        model: Comment,
        include: [User]
      }],
      order: [
        [Comment, 'createdAt', 'DESC']
      ]
    })
    .then(img => {
      // res.send(img)
      res.render('users/image', {
        img
      })
    })
    .catch(err => {
      res.send(err.message)
    })
})

routes.post('/:id', (req, res) => {
  Comment.create({
      text: req.body.text,
      ImageId: req.params.id,
      UserId: req.session.login.id,
    })
    .then(() => {
      res.redirect(`/image/${req.params.id}`)
    })
    .catch(err => {
      res.send(err.message)
    })
})

module.exports = routes