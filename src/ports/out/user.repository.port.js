//contrato/interface do repositório

const UserRepositoryPort = {
  findByEmail: async (email) => { throw new Error('Not implemented') },
  save: async (user) => { throw new Error('Not implemented') },
}

module.exports = UserRepositoryPort