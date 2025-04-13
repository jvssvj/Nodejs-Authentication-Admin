const { userModel } = require("../models/userModel")

const adminController = {
    createUser: (req, res) => {
        const { username, email, password, role } = req.body
        const result = userModel.createUser(username, email, password, role)

        if (!result.success) return res.status(400).json({ success: false, message: result.message })

        return res.status(201).json(result)
    },

    getUser: (req, res) => {
        const { email } = req.body
        const result = userModel.getUser(email)

        if (!result.success) return res.status(404).json({ success: false, message: result.message })

        return res.status(200).json(result)
    },

    getUsers: (req, res) => {
        const result = userModel.getUsers()

        return res.status(200).json(result)
    },

    deleteUser: (req, res) => {
        const { email } = req.body
        const result = userModel.deleteUser(email)

        if (!result.success) return res.status(404).json({ success: false, message: result.message })

        return res.status(200).json(result)
    }
}

module.exports = adminController