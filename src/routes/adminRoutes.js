const express = require('express')
const adminRouter = express.Router()
const authMiddleware = require('../middlewares/authMiddleware')
const adminMiddleware = require('../middlewares/adminMiddleware')
const { createUser, getUser, getUsers, deleteUser } = require('../controllers/adminController')

adminRouter.post('/users', authMiddleware, adminMiddleware, createUser)
adminRouter.get('/users/:email', authMiddleware, adminMiddleware, getUser)
adminRouter.get('/users', authMiddleware, adminMiddleware, getUsers)
adminRouter.delete('/users/:email', authMiddleware, adminMiddleware, deleteUser)

module.exports = adminRouter