const adminMiddleware = (req, res, next) => {
    const user = req.authenticatedUser // já foi definido no authMiddleware

    if (user.role !== 'Administrador') {
        return res.status(403).json({ message: "Somente administradores podem acessar essa área." })
    }

    next()
}

module.exports = adminMiddleware