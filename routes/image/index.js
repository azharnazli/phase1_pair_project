const routes = require('express').Router()
const {
  Image,
  Comment,
  User
} = require('../../models')


routes.get('/:id', (req, res) => {
  Image.findByPk(req.params.id, {
      include: [{
        model: User},
        {model: Comment,
        include: [User]
      }],
      order: [
        [Comment, 'createdAt', 'DESC']
      ]
    })
    .then(image => {
      // res.send(img)
      res.render('users/image', {
        image
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