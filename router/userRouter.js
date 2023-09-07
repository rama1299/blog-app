const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')

router.get('/users', UserController.findUsers)
router.get('/users/export', UserController.exportUserToExcel)
router.get('/users/:userId', UserController.findUserById)
router.post('/users', UserController.createUser)
router.put('/users/:userId', UserController.updateUser)
router.delete('/users/:userId', UserController.deleteUser)

module.exports = router