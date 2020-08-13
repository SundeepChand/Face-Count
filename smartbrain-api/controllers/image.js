require('dotenv').config()
const clarifai = require('clarifai')

const app = new Clarifai.App({
  apiKey: process.env.API_KEY
})

const handleAPICall = (req, res) => {
  app.models.predict(clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data)
    })
    .catch(error => {
      res.status(400).json({ error: 'Unable to fetch data from API' })
    })
}

const handleImageUpdate = (req, res, db) => {
    const id = req.body.id
  
    db('users')
      .where('id', '=', id)
      .increment('entries', 1)
      .returning('*')
      .then(user => {
        if (user.length)
          res.json(user[0])
        else
          res.status(400).json('Error in updating entries')
      })
      .catch(error => {
        res.status(400).json('Error in updating entries')
      })
}

module.exports = {
    handleImageUpdate,
    handleAPICall
}