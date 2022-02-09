const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const Routes = require('./../routes/main')

const middleware = (app) => {
  app.use(cors())
  app.options('*', cors())
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json())
  app.get('env') === 'development' ? app.use(morgan('dev')) : app.use(helmet())
  app.use('/uploads', express.static('uploads'))
  app.use('/api', Routes)
}

module.exports = middleware
