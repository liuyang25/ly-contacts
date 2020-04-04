let express = require('express')
let bodyParser = require('body-parser')
// require('./utils/common')
let mock = require('./mock')

let port = process.env.PORT || 9999
let app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(function(req, res, next) {
  console.log(req.url)
  next()
})


app.listen(port, () => {
  console.log(`devServer start on port:${port}`)
})
mock(app)

process.on('uncaughtException', function(err) {
  //打印出错误
  console.log(err)
  //打印出错误的调用栈方便调试
  console.log(err.stack)
})
