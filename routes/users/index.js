const routes = require('express').Router()
const {
  User,
  Image,
  Tag,
  profileImage
} = require('../../models')
const {
  upload,
  profileUpload
} = require('../../helper/multer')
const fs = require('fs')
const checkLogin = require('../../middlewares/checklogin')


routes.get('/profile/:id', checkLogin, (req, res) => {
  User.findByPk(req.session.login.id, {
      include: [{
        model: profileImage
      }, {
        model: Image
      }]
    })
    .then(user => {
      // res.send(user)
      res.render('users/profile', {
        user
      })
    })
    .catch(err => {
      res.send(err.message)
    })
})
routes.get('/:id/edit', (req, res) => {
  User.findByPk(req.params.id)
    .then(user => {
      res.render('users/updateprofile', {
        user
      })

    })
})

routes.post('/:id/edit', (req, res) => {
  User.findByPk(req.params.id)
    .then(user => {
      return user.update(req.body)
    })
    .then(success => {
      res.redirect('/users/profile/' + req.params.id)
    })
    .catch(err => {
      res.send(err)
    })
})

routes.get('/editimage', (req, res) => {
  if (!req.session.login) {
    res.redirect('/')
  }
  Tag.findAll()
    .then(tags => {
      res.render('users/editphoto', {
        tags
      })
    })
})

//MVP CAMAN
routes.post("/editimage/:id", (req, res, next) => {
  if (!req.session.login) {
    res.redirect('/login')
  } else next()
}, upload.single("image"), (req, res) => {
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
      res.redirect('/')
    })
    .catch(err => {
      res.send(err)
    })
})


module.exports = routes