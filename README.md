# 🧾 Projeto Node.js com Autenticação e Administração

## 📁 Estrutura do Projeto
```
/
|-- controllers/
|   |-- adminController.js
|
|-- middlewares/
|   |-- authMiddleware.js
|   |-- adminMiddleware.js
|
|-- models/
|   |-- userModel.js
|
|-- routes/
|   |-- authRoutes.js
|   |-- protectedRoutes.js
|   |-- adminRoutes.js
|
|-- app.js
|-- package.json
```
## 🚀 Tecnologias

- Node.js
- Express
- JWT (JSON Web Token)

## 🛋️ Models (models/userModel.js)
Responsáveis por lidar com os **dados** e as **regras de negócio.**

### Funções principais:

- `registerUser(username, email, password)`
- `createUser(username, email, password, role)`
- `getUser(email)`
- `getUsers()`
- `deleteUser(email)`

### O que fazem:

- Validam entradas
- Verificam duplicatas
- Criam, listam e removem usuários
- NÃO retornam res.status(), apenas objetos como:
```
{ success: true, message: '...', user }
{ success: false, message: '...' }
```

## 📄 Controllers (controllers/adminController.js)
Responsáveis por **receber a requisição** e **enviar a resposta.**

### Funções principais:

- `createUser`
- `getUser`
- `getUsers`
- `deleteUser`

### O que fazem:

- Pegam dados do req.body
- Chamam o model correspondente
- Definem o status HTTP correto
- Respondem com res.status(...).json(...)

### Exemplo:
```
const result = userModel.createUser(...)
if (!result.success) return res.status(400).json({ message: result.message })
res.status(201).json(result)
```

## 🔒 Middlewares

### `authMiddleware.js`
- Verifica o JWT (token) vindo no cabeçalho
- Decodifica e anexa o usuário autenticado em `req.authenticatedUser`

### `adminMiddleware.js`
- Confirma se `req.authenticatedUser.role` é "Adminitrador"
- Se não for, retorna erro 403

## 👌 Rotas

### `routes/authRoutes.js`
- `POST /auth/register`
- `POST /auth/login`

### `routes/protectedRoutes.js`
- `GET /dashboard (exemplo)`
- Protegida por `authMiddleware`

### `routes/adminRoutes.js`

- `POST /createUser` ➜ Cria outros admins ou usuários (só admin)

- `GET /getUser` ➜ Busca um usuário pelo email

- `GET /getUsers` ➜ Lista todos os usuários

- `DELETE /deleteUser` ➜ Remove um usuário

**Todas essas rotas usam**: `authMiddleware` + `adminMiddleware`

## 📈 Código de Status Recomendado

| Operação               | Status |
|------------------------|--------|
| Criar um usuário       | 201    |
| Mostrar 1 usuário      | 200    |
| Mostrar todos os usuários | 200  |
| Deletar usuário        | 200    |
| Erros de validação     | 400    |
| Não encontrado         | 404    |
| Acesso negado          | 403    |
| Não autenticado        | 401    |

## 📁 Exemplo de Usuário
```
{
  username: "João Vitor",
  email: "joao@email.com",
  password: "12345",
  role: "Adminitrador" // ou "Usuário padrão"
}
```
