const handleProfileGet = (request, response, db) => {
    const id = request.params.id  
    db
      .select('*')
      .from('users')
      .where({
        id
      })
      .then(user => {
        if (user.length) {
          response.json(user[0])
        } else {
          response.status(404).json('error getting user')
        }
      })
      .catch(error => {
        response.status(404).json('error getting user')
      })
}

module.exports = {
    handleProfileGet
}