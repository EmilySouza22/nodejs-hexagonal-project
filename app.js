require('dotenv').config()

const express = require('express')

//in
const { makeAuthController } = require('./src/adapters/in/auth.controller')
const { makeAuthRouter } = require('./src/ports/in/http/auth.router')

//core
const { loginUseCase, registerUseCase } = require('./src/domain/user/user.use-case')

//out
const { makeUserRepository } = require('./src/adapters/out/user.repository')
const { makeTokenService } = require('./src/adapters/out/jwt.adapter')
const { makePasswordService } = require('./src/adapters/out/bcrypt.adapter')

//infra
const { makeConnection } = require('./src/infra/mysql/connection')

const app = express()
app.use(express.json())

const connection = makeConnection()
const userRepository = makeUserRepository(connection)
const tokenService = makeTokenService(process.env.JWT_SECRET)
const passwordService = makePasswordService()

const login = loginUseCase(userRepository, tokenService, passwordService)
const register = registerUseCase(userRepository, tokenService, passwordService)

const authController = makeAuthController(login, register)
const authRouter = makeAuthRouter(authController)

app.use('/auth', authRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

module.exports = app