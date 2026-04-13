//TO DO: dependencias, express

require('dotenv').config()

const express = require('express')

const { makeConnection } = require('./src/infra/mysql/connection')
const { makeUserRepository } = require('./src/adapters/out/user.repository')
const { makeTokenService } = require('./src/adapters/out/jwt.adapter')
const { makePasswordService } = require('./src/adapters/out/bcrypt.adapter')
const { loginUseCase } = require('./src/domain/user/user.use-case')
const { makeAuthController } = require('./src/adapters/in/auth.controller')
const { makeAuthRouter } = require('./src/ports/in/http/auth.router')

const app = express()
app.use(express.json())

const connection = makeConnection()
const userRepository = makeUserRepository(connection)
const tokenService = makeTokenService(process.env.JWT_SECRET)
const passwordService = makePasswordService()

const login = loginUseCase(userRepository, tokenService, passwordService)
const authController = makeAuthController(login)
const authRouter = makeAuthRouter(authController)

app.use('/auth', authRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

module.exports = app