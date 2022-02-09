const express = require('express')
const authRoutes = require('./authRoutes')
const categoryRoutes = require('./categoryRoutes')
const userRoutes = require('./userRoutes')
const postRoutes = require('./postRoutes')

const main = express()

main.use('/auth', authRoutes)
main.use('/category', categoryRoutes)
main.use('/user', userRoutes)
main.use('/post', postRoutes)

module.exports = main
