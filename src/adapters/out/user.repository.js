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
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [user.email, user.password]
    )
    return { id: result.insertId, email: user.email }
  },
})

module.exports = { makeUserRepository }