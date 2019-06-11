require('dotenv/config')
const config = require('./config')

module.exports = () => config(process.env.NODE_ENV)
