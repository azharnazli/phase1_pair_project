const routes = require('express').Router()
const { User, Image, Tag} = require('../../models')
const { upload } = require('../../helper/multer')
const fs = require('fs')

routes.get('/profile/:id', (req, res) => {
  let tags;
  if (!req.session.login) {
    res.redirect('/')
  }
  Tag.findAll()
    .then(tags => {
      tag = tags
    })
  User.findByPk(req.session.login.id, {
      include: [Image]
    })
    .then(user => {
      // res.send(tag)
      res.render('users/profile', {
        user,tag
      })
    })
    .catch(err => {
      res.send(err)
    })
})

routes.get('/editimage', (req, res)=> {
  Tag.findAll()
    .then(tags => {
      res.render('users/editphoto', { tags })
    })
})

//MVP CAMAN
routes.post("/editimage/:id", upload.single("image"), (req, res) => {
  var strToReplace = req.body.image
  var strImage = strToReplace.replace(/^data:image\/[a-z]+;base64,/, "");
  var base64Str = strImage
  let path = 'public/upload/' + Date.now() + '.png'
  fs.writeFileSync(path, base64Str, {
      encoding: "base64"
  })

  console.log(req.body.title)

  Image.create({
      path: path,
      UserId: req.params.id
  })
      .then(data => {
          res.send('success')
      })
      .catch(err => {
          res.send(err)
      })
})




module.exports = routes