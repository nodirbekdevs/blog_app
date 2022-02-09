const router = require('express').Router()
const {getCategories, getCategory, makeCategory, updateCategory, deleteCategory} = require('./../views/categoryViews')
const {auth, isAdmin} = require('./../middleware/permissions')

router.get('/', auth, getCategories)
router.get('/:id', auth, getCategory)
router.post('/make', [auth, isAdmin], makeCategory)
router.put('/edit/:id', [auth, isAdmin], updateCategory)
router.delete('/delete/"id', [auth, isAdmin], deleteCategory)

module.exports = router
