require('dotenv').config();

const roles = [process.env.ROLE_USER, process.env.ROLE_ADMIN]

module.exports = roles