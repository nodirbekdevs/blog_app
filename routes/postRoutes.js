const router = require('express').Router()
const {getPosts, searchPosts, getPost, makePost, updatePost, deletePost} = require('./../views/postViews')
const {auth, isAdmin, transfer} = require('./../middleware/permissions')

router.get('/', auth, getPosts)
router.get('/search', auth, searchPosts)
router.get('/:id', auth, getPost)
router.post('/make', [auth, isAdmin], transfer, makePost)
router.put('/edit/:id', [auth, isAdmin],  transfer, updatePost)
router.delete('/delete/:id', [auth, isAdmin],  deletePost)

module.exports = router
