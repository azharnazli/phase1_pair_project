const express = require('express')
const app = express()
const port = process.env.port || 3000
const routes = require('./routes')
const session = require('express-session')
const addSession = require('./middlewares/session')


app.use(session({
  secret: 'keyboard cat',
}))

app.use(addSession)
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended : true}))
app.use(express.static(__dirname + '/public'))

app.use("*/css",express.static("public/css"));
app.use('*/js',express.static("public/js"));
app.use("*/images",express.static("public/images"))
app.use("*/upload",express.static("public/upload"))
app.use("*/uploads",express.static("public/uploads"))


app.use('/', routes)






app.listen(port, () => {
  console.log(`listening on port : ${port}`)
})