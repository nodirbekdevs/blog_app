const router = require('express').Router()
const {login, register} = require('./../views/authViews')

router.post('/login', login)
router.post('/register', register)

module.exports = router
