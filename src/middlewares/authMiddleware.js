const jwt = require('jsonwebtoken')
const { users } = require('../models/userModel')

const secretKey = 'palavra-secreta-muito-top'

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) return res.status(401).json({ message: "Authorization header required" })

    const token = authHeader.split(' ')[1]

    try {
        const decodedToken = jwt.verify(token, secretKey)

        const user = users.find(user => user.email === decodedToken.email)
        if (!user) return res.status(401).json({ error: "Invalid user" })

        req.authenticatedUser = user
        next()
    } catch (error) {
        return res.status(401).json({ message: "👀 Olá, visitante! Faça login para continuar." })
    }
}

module.exports = authMiddleware