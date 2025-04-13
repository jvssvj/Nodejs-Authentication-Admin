const { userModel, users } = require("../models/userModel")
const jwt = require('jsonwebtoken')

const secretKey = 'palavra-secreta-muito-top'

const authController = {
    register: (req, res) => {
        const { name, email, password } = req.body
        const result = userModel.registerUser(name, email, password)

        if (result.error) return res.status(400).json({ message: result.error })

        return res.status(201).json(result)
    },

    login: (req, res) => {
        const { email, password } = req.body

        if (users.error) return res.status(404).json({ message: users.error })

        const user = users.find(user => user.email === email)
        if (!user) return res.status(404).json({ message: "Usuário não encontrado" })
        if (user.password !== password) return res.status(401).json({ message: "Dados inválidos" })

        const payload = {
            id: user.id,
            email: user.email,
            role: user.role
        }

        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' })

        return res.json({ message: "Login bem sucedido!", token })
    }
}

module.exports = authController