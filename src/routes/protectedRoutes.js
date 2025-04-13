const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')

const protectedRouter = express.Router()

protectedRouter.get('/dashboard', authMiddleware, (req, res) => {
    const user = req.authenticatedUSer
    res.json({ message: `Bem-vindo, ${user.name}` })
})

module.exports = protectedRouter