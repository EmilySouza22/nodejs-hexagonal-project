//TO DO: Express routes

const { Router } = require('express')

const makeAuthRouter = (authController) => {
  const router = Router()

  router.post('/login', authController.login)

  return router
}

module.exports = { makeAuthRouter }