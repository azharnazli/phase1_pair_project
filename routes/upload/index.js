const routes = require('express').Router()
const { profileImage } = require('../../models')
const { upload } = require('../../helper/storage')
const  checkLogin  = require('../../middlewares/checklogin')


routes.post('/:id',upload.single('img'),checkLogin ,(req, res)=> {
  profileImage.create({
    path : `/${req.file.path}`,
    UserId: req.session.login.id
  })
    .then(()=> {
      // res.send(req.body)
      res.redirect('/')
    })
    .catch(err => {
      res.send(err)
    })
})




module.exports = routes