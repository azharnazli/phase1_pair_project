const routes = require('express').Router()
const {
  Image,
  Comment,
  User,
  profileImage
} = require('../../models')

const checklogin = require('../../middlewares/checklogin')


routes.get('/:id', (req, res) => {
  Image.findByPk(req.params.id, {
      include: [{
        model: User,
        include: [{
          model: profileImage
        }]
      }, {
        model: Comment,
      }],
      order: [
        [Comment, 'createdAt', 'DESC'],
      ]
    })
    .then(image => {
      // res.send(image)
      res.render('users/image', {
        image
      })
    })
    .catch(err => {
      res.send(err.message)
    })
})

routes.post('/:id', checklogin, (req, res) => {
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