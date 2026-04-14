const { z } = require('zod')

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
})

const validateRegisterDto = (data) => registerSchema.parse(data)

module.exports = { validateRegisterDto }