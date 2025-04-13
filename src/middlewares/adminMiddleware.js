const adminMiddleware = (req, res, next) => {
    const user = req.authenticatedUser

    if (user.role !== 'Administrador') {
        return res.status(403).json({ message: "Somente administradores podem acessar essa área." })
    }

    next()
}

module.exports = adminMiddleware