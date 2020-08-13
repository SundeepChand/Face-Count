const handleSignin = (req, res, db, bcrypt) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json('incorrect form submission')
    }

    db
        .select('email', 'hash', 'verified')
        .where({
            email
        })
        .from('login')
        .then(data => {
            if (data.length > 0 && bcrypt.compareSync(password, data[0].hash) && data[0].verified) {
                
                return db
                .select('*')
                .from('users')
                .where({ email })
                .then(user => {
                    res.json(user[0])
                })
                .catch(error => {
                    res.status(400).json('Unable to login')
                })

            } else if (!data[0].verified) {

                return res.json({ tokenerror: 'This account is not verified'})

            } else {

                return res.status(401).json('Invalid credentials')

            }
        })
        .catch(error => {
            res.status(401).json({ error: 'Invalid credentials'})
        })
}

module.exports = {
    handleSignin
}