const jwt = require('jsonwebtoken')
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const auth = (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token) return res.status(400).json({ msg: 'Invalid Authorization' })

        jwt.verify(token, process.env.Access_Secret, (err, user) => {
            if (err) return res.status(400).json({ msg: 'Invalid Authorization' })
            req.user = user;
            next();
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}
module.exports = auth;