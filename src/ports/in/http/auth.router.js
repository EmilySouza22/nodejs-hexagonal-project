const { Router } = require('express')

const makeAuthRouter = (authController) => {
  const router = Router()

  router.post('/login', authController.login)
  router.post('/register', authController.register)

  return router
}

module.exports = { makeAuthRouter }