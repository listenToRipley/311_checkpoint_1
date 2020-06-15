const express = require('express')
const app = express()
const port = process.env.PORT || 4002
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(require('./routes/user'))

app.listen(port, () => {
  console.log('app is listening on:', port)
})