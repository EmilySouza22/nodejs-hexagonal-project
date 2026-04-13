const { z } = require('zod')

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

const validateLoginDto = (data) => loginSchema.parse(data)

module.exports = { validateLoginDto }