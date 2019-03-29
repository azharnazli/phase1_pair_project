module.exports = checklogin =(req, res, next) => {
  if(!res.locals.login) res.redirect('/login')
   else next()
}