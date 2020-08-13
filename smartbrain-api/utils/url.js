require('dotenv').config()

let baseUrl = 'http://face-count.herokuapp.com'
if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:3001'
}

module.exports = baseUrl