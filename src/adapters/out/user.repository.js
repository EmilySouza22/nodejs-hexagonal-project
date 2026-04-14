// implementação concreta (mySQL)

const makeUserRepository = (connection) => ({
  findByEmail: async (email) => {
    const [rows] = await connection.execute(
      'SELECT id, email, password FROM users WHERE email = ?',
      [email]
    )
    return rows[0] ?? null
  },

  save: async (user) => {
    const [result] = await connection.execute(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [user.name, user.email, user.password]
    )
    return { id: result.insertId, name: user.name, email: user.email }
  },
})

module.exports = { makeUserRepository }