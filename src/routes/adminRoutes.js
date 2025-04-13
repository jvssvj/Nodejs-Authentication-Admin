const express = require('express')
const adminRouter = express.Router()
const authMiddleware = require('../middlewares/authMiddleware')
const adminMiddleware = require('../middlewares/adminMiddleware')
const adminController = require('../controllers/adminController')

adminRouter.post('/users', authMiddleware, adminMiddleware, adminController.createUser)
adminRouter.get('/users/:email', authMiddleware, adminMiddleware, adminController.getUser)
adminRouter.get('/users', authMiddleware, adminMiddleware, adminController.getUsers)
adminRouter.delete('/users/:email', authMiddleware, adminMiddleware, adminController.deleteUser)

module.exports = adminRouter