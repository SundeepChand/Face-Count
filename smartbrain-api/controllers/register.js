require('dotenv').config()
const jwt = require('jsonwebtoken')
const baseUrl = require('../utils/url')

const handleRegister = (req, res, next, db, bcrypt, nodemailer) => {
  const { email, name, password } = req.body

  if (!email || !name || !password) {
    return res.status(400).json('incorrect form submission')
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSWORD
    }
  })

  const saltRounds = 10
  const hash = bcrypt.hashSync(password, saltRounds)

  db.transaction(trx => {
    trx.insert({
      hash: hash,
      email: email
    })
    .into('login')
    .returning('email')
    .then(loginEmail => {

      const tokenData = {
        email
      }

      const token = jwt.sign(tokenData, process.env.SECRET)

      const mailOptions = {
        from: process.env.EMAIL_ID,
        to: loginEmail,
        subject: 'Link for activation',
        html: `<a href="${baseUrl}/confirm/${token}">Click here</a> to activate your account and then sign-in`
      }
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
            res.status(500).json(`Something went wrong. Unable to send email\nERROR:\n${error}`)
        } else {
            console.log(`Email sent: ${info.response}`)
            return trx('users')
              .returning('*')
              .insert({
                email: loginEmail[0],
                name: name,
                joined: new Date()
              })
              .then(() => {
                res.json({ message: 'Link sent to email'})
              })
              .then(trx.commit)
              .catch(error => {
                trx.rollback()
                res.status(400).json('Unable to register')
              })
        }
      })
    })
    .catch(error => {
      res.status(400).json('Unable to register')
    })
  })
  .catch(error => {
    res.status(400).json('Unable to register')
  })
}

const handleResendMail = (req, res, nodemailer) => {
  const { email } = req.body

  if (!email) {
    return res.status(400).json('incorrect form submission')
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSWORD
    }
  })

  const tokenData = {
    email
  }

  const token = jwt.sign(tokenData, process.env.SECRET)

  const mailOptions = {
    from: process.env.EMAIL_ID,
    to: email,
    subject: 'Link for activation',
    html: `<a href="${baseUrl}/confirm/${token}">Click here</a> to activate your account and then sign-in`
  }
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
      res.status(500).json({ error: `Something went wrong. Unable to send email\nERROR:\n${error}` })
    } else {
      console.log(`Email sent: ${info.response}`)
      res.json({ message: 'Link sent to email'})
    }
  })
}

module.exports = {
  handleRegister,
  handleResendMail
}