const routes = require('express').Router()
const { Image } = require('../../models')
const multer = require('multer')
const storage = multer.diskStorage({
  destination : (req, file, cb) => {
    cb(null, 'public/upload')
  },
  filename: (req, file, cb)=> {
    cb(null,file.fieldname+'-'+Date.now()+'.jpg')
  }
})



const upload = multer({ storage })
routes.post('/',upload.single('img') ,(req, res)=> {
  Image.create({
    path : `/${req.file.path}`,
    UserId: req.session.login.id
  })
    .then(()=> {
      res.redirect('/users/profile')
    })
})




module.exports = routes