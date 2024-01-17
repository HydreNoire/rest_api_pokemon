const { User } = require('../models/user');
const bcrypt = require('bcrypt');

module.exports = (app) => {
    app.post('/api/login', (req, res) => {

        User.findOne({ where: { username: req.body.username } }).then(user => {
            bcrypt.compare(req.body.password, user.password).then(isPaswordValid => {
                if (isPaswordValid) {
                    const message = `L'utilisateur a été connecté avec succès`;
                    return res.json({ message: message, data: user })
                }
            })
        })

    })
}