const routes = require('express').Router()
const {
  User,
  Tag,
  Image,
  TagImage
} = require('../../models')



routes.get('/:id', (req, res) => {
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

routes.post('/:id', (req, res) => {
  let image;
  User.findByPk(req.params.id, {
      include: [Image],
      order: [
        [Image, 'createdAt', 'desc']
      ],
    })
    .then(user => {
      if(!req.body.id){
        res.redirect('/')
      }
      if (req.body.tagId > 1) {
        [image] = user.Images
        let data = req.body.tagId.reduce((acc, el) => {
          acc.push({
            ImageId: image.id,
            TagId: el,
          })
          return acc
        }, [])
        return TagImage.bulkCreate(data)
      } else {
      return TagImage.create({
          ImageId: image.id,
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