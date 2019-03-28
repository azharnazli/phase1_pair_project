const routes = require('express').Router()
const {
  Tag,
  Image
} = require('../../models')



routes.get('/:id', (req, res) => {
  let imageTag;
  Image.findAll({
      where: {
        UserId: req.params.id
      },
      order: [
        ['createdAt', 'DESC']
      ],
      limit: 1
    })
    .then(img => {
     [ imageTag] = img
      return Tag.findAll()
    })
    .then((tags) => {
      // res.send(imageTag)
      res.render('users/addtags', {
        imageTag,
        tags
      })
    })
    .catch((err) => {
      res.send(err)
    })
})



module.exports = routes