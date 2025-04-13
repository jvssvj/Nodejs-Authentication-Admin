const users = [
    { username: "João Vitor", email: "joao@email.com", password: "12345", role: 'Administrador' }
]

const userModel = {
    registerUser: (username, email, password) => {
        if (!username) return { success: false, message: "Nome é obrigatório." }
        if (!email) return { success: false, message: "Email é obrigatório." }
        if (!password) return { success: false, message: "Senha é obrigatória." }

        const existingEmail = users.find(user => user.email === email)
        if (existingEmail) return { success: false, message: "Email em uso." }

        const user = { username, email, password, role: "Usuário padrão" }
        users.push(user)

        return { success: true, message: "Usuário cadastrado com sucesso!", user }
    },

    createUser: (username, email, password, role) => {
        if (!username) return { success: false, message: "Nome é obrigatório." }
        if (!email) return { success: false, message: "Email é obrigatório." }
        if (!password) return { success: false, message: "Senha é obrigatória." }
        if (!['Administrador', 'Usuário padrão'].includes(role)) {
            return {
                success: false,
                message: "Tipo do usuário inválido. (Administrador ou Usuário padrão)"
            }
        }

        const existingEmail = users.find(user => user.email === email)
        if (existingEmail) return { success: false, message: "Email em uso." }

        const user = { username, email, password, role }
        users.push(user)

        return { success: true, message: "Usuário cadastrado com sucesso!", user }
    },

    getUser: (email) => {
        const user = users.find(user => user.email === email)
        if (!user) return { success: false, message: "Usuário não encontrado." }

        return { success: true, message: "Usuário encontrado.", user }
    },

    getUsers: () => {
        if (users.length === 0) return { success: true, message: "Nenhum usuário cadastrado.", users: [] }

        return { success: true, message: "Lista de usuários.", users }
    },

    deleteUser: (email) => {
        const userIndex = users.findIndex(user => user.email === email)
        if (userIndex === -1) return { success: false, message: "Usuário não encontrado." }

        users.splice(userIndex, 1)

        return { success: true, message: `Usuário com o email '${email}' foi deletado.` }
    }
}

module.exports = { userModel, users }