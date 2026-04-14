const loginUseCase = (userRepository, tokenService, passwordService) => async ({ email, password }) => {
  const user = await userRepository.findByEmail(email)
  if (!user) throw new Error('User not found')

  const isValid = await passwordService.compare(password, user.password)
  if (!isValid) throw new Error('Invalid credentials')

  const token = tokenService.sign({ id: user.id, email: user.email })
  return { token, message: 'Login successful' }
}

const registerUseCase = (userRepository, tokenService, passwordService) => async ({ name, email, password }) => {
  const existingUser = await userRepository.findByEmail(email)
  if (existingUser) throw new Error('Email already in use')

  const hashedPassword = await passwordService.hash(password)

  const newUser = await userRepository.save({ name, email, password: hashedPassword })

  const token = tokenService.sign({ id: newUser.id, email: newUser.email })
    return { token, message: 'Register successful' }
}

module.exports = { loginUseCase, registerUseCase }