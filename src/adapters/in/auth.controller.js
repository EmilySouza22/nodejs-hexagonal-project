const { validateLoginDto } = require('./dtos/login.dto')
const { validateRegisterDto } = require('./dtos/register.dto')

const makeAuthController = (loginUseCase, registerUseCase) => ({
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

  register: async (req, res) => {
    try {
      const dto = validateRegisterDto(req.body)
      const result = await registerUseCase(dto)
      return res.status(201).json(result)
    } catch (error) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ message: error.errors })
      }
      if (error.message === 'Email already in use') {
        return res.status(409).json({ message: 'Email already in use' })
      }
      return res.status(500).json({ message: 'Internal server error' })
    }
  },
})

module.exports = { makeAuthController }