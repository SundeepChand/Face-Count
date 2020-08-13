require('dotenv').config()
const express = require('express')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const cors = require('cors')
const knex = require('knex')

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')
const confirm = require('./controllers/confirm')

let connection = {
  connectionString : process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
}
if (process.env.NODE_ENV === 'development') {
  connection = {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'PRATIMACHOUDHURY2001',
    database: 'smart-brain'
  }
}

const db = knex({
  client: 'pg',
  connection
})

// db.select('*').from('users')
//   .then(data => {
//     console.log(data)
//   })

const PORT = process.env.PORT
const app = express()

app.use(cors({origin: true, credentials: true}))
app.use(express.json())

app.use(express.static('build'))

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

app.post('/register', (req, res, next) => { register.handleRegister(req, res, next, db, bcrypt, nodemailer) })

app.get('/confirm/:token', (req, res) => { confirm.handleConfirm(req, res, db) })

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

app.put('/image', (req, res) => { image.handleImageUpdate(req, res, db) })

app.post('/imageurl', (req, res) => { image.handleAPICall(req, res, db) })

app.post('/resend', (req, res) => { register.handleResendMail(req, res, nodemailer) })

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})