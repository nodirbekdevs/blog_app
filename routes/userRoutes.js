const router = require('express').Router()
const {getUsers, getUser, makeUser, updateUser, makeAdmin, updateToSuperAdmin, updateAdmin, blockOrUnblock, deleteUser} = require('./../views/userViews')
const {auth, isAdmin, isSuperAdmin} = require('./../middleware/permissions')

router.get('/', [auth, isAdmin], getUsers)
router.get('/:id', [auth, isAdmin], getUser)
router.post('/make', [auth, isAdmin], makeUser)
router.post('/makeAdmin', [auth, isSuperAdmin], makeAdmin)
router.put('/edit/:id', [auth, isAdmin], updateUser)
router.put('/editToSuperAdmin/:id', [auth, isSuperAdmin], updateToSuperAdmin)
router.put('/editAdmin/:id', [auth, isSuperAdmin], updateAdmin)
router.put('/blockOrUnblock/:id', [auth, isAdmin], blockOrUnblock)
router.delete('/delete/"id', [auth, isAdmin], deleteUser)

module.exports = router
