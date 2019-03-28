const routes = require('express').Router()
const { Image } = require('../../models')
const { upload } = require('../../helper/multer')


routes.post('/',upload.single('img') ,(req, res)=> {
  console.log(req.file)
  Image.create({
    path : `/${req.file.path}`,
    UserId: req.session.login.id
  })
    .then(()=> {
      // res.send(req.body)
      res.redirect('/users/profile')
    })
})




module.exports = routes