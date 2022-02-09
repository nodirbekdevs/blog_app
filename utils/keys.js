const bcrypt = require('bcryptjs')

const PORT = 9000
// const mongo_url = 'mongodb://localhost/blog'
const mongo_url = 'mongodb+srv://admin:admin@cluster0.wcosh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const mongo_options = {useNewUrlParser: true, useUnifiedTopology: true}
const salt = bcrypt.genSaltSync(10)
const secret_jwt = 'blog-app-jwt'

module.exports = {PORT, mongo_url, mongo_options, salt, secret_jwt}
