require('dotenv').config();
const jwt = require('jsonwebtoken')

exports.generateToken = (_userId, roles) => {
    const token = jwt.sign({userId: _userId, roles: roles}, process.env.JWT_SECRET_KEY, {expiresIn: '1d'})
    return token 
}