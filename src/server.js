const express = require('express')
const app = express()
const authRoutes = require('./routes/authRoutes')
const protectedRouter = require('./routes/protectedRoutes')
const adminRouter = require('./routes/adminRoutes')

app.use(express.json())

app.use('/auth', authRoutes)
app.use(protectedRouter)
app.use('/admin', adminRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`http://localhost:${PORT}`))