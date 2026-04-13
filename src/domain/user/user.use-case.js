// TO DO: User Case
// casos de uso (register, login) — funções puras

const loginUseCase = (userRepository, tokenService, passwordService) => async ({ email, password }) => {
  const user = await userRepository.findByEmail(email)
  if (!user) throw new Error('User not found')

  const isValid = await passwordService.compare(password, user.password)
  if (!isValid) throw new Error('Invalid credentials')

  const token = tokenService.sign({ id: user.id, email: user.email })
  return { token }
}

module.exports = { loginUseCase }