//TO DO: recebe req, chama use-case, devolve res

const { validateLoginDto } = require('./dtos/login.dto')

const makeAuthController = (loginUseCase) => ({
  login: async (req, res) => {
    try {
      const dto = validateLoginDto(req.body)
      const result = await loginUseCase(dto)
      return res.status(200).json(result)
    } catch (error) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ message: error.errors })
      }
      if (error.message === 'User not found' || error.message === 'Invalid credentials') {
        return res.status(401).json({ message: 'Invalid email or password' })
      }
      return res.status(500).json({ message: 'Internal server error' })
    }
  },
})

module.exports = { makeAuthController }