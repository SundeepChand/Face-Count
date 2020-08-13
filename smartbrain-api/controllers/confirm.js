require('dotenv').config()
const jwt = require('jsonwebtoken')
const baseUrl = require('../utils/url')

const handleConfirm = (req, res, db) => {
  console.log()
  const token = req.params.token
  if (!token) {
    return res.status(401).json({ error: 'Invalid token' })
  }
  const decodedToken = jwt.verify(token, process.env.SECRET)
  console.log(decodedToken)

  db('login')
    .where('email', '=', decodedToken.email)
    .update({
      verified: true
    })
    .then(() => {
      res.status(200).redirect(`${baseUrl}/confirm.html`)
    })
    .catch(err => {
      res.status(500).json({ error: 'Unable to confirm your email. Try reopening the link, or contact admin if problem persists.' })
    })
}

module.exports = {
    handleConfirm
}