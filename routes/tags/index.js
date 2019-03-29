const routes = require('express').Router()
const {
  User,
  Tag,
  Image,
  TagImage
} = require('../../models')

const checkLogin = require('../../middlewares/checklogin')



routes.get('/:id',checkLogin, (req, res) => {
  let imageTag;
  Image.findAll({
      where: {
        UserId: req.params.id,
      },
      order: [
        ['id', 'desc']
      ],
      limit: 1
    })
    .then(img => {
      [imageTag] = img
      return Tag.findAll()
    })
    .then((tags) => {
      res.render('users/addtags', {
        imageTag,
        tags
      })
    })
    .catch((err) => {
      res.send(err)
    })
})

routes.post('/:id',checkLogin, (req, res) => {
  let gambar;
  User.findByPk(req.params.id, {
      include: [Image],
      order: [
        [Image, 'createdAt', 'desc']
      ],
    })
    .then(user => {
      [gambar] = user.Images
      if (!req.body.tagId) {
        res.redirect('/')
      }
      if (req.body.tagId.length > 1) {
        let data = req.body.tagId.reduce((acc, el) => {
          acc.push({
            ImageId: gambar.id,
            TagId: el,
          })
          return acc
        }, [])
        return TagImage.bulkCreate(data)
      } else {
        return TagImage.create({
          ImageId: gambar.id,
          TagId: req.body.tagId
        })
      }
    })
    .then(() => {
      res.redirect('/')
    })
    .catch(err => {
      res.send(err.message)
    })
})



module.exports = routes