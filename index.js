const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const sessionParser  = require('express-session')
const app = express()

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(sessionParser({
  secret: 'xinhui',
  cookie: {maxAge: 60 * 1000 * 30},
  resave: false,
  saveUninitialized: true
}))
app.use(express.static(__dirname + '/static'))

app.get('/', (req, res) => {
  res.send('hello word')
})

app.post('/c', (req, res) => {  
  res.cookie('username', "caae", { maxAge: 10000*2, httpOnly: true, signed:true })
  res.cookie('pass', "ddd", { maxAge: 10000*2, httpOnly: true })
  console.log(req.cookies)
  res.status(200).send('sr')
})
app.get('/api/auth/login', function (req, res) {
  const { query } = req
  console.log(query)
  if (!req.session.sign) {
    req.session.sign = true
    req.session.name = query.username
  }
  res.status(200).send({
    data: { username: req.session.name }, 
    code: 'success',
    message: 'baoc,' + req.session.name
  })
})
app.listen(3000, () => {
  console.log('app is listen 3000')  
})