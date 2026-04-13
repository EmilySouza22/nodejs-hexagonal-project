// TO DO: Entitie User

//entidade pura, sem deps externas

class User {
  constructor({ id, email, password }) {
    this.id = id
    this.email = email
    this.password = password
  }
}

module.exports = User