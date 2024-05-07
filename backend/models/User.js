const { pool } = require('../db')

class User {
  static async findByUsername(username) {
    const result = await pool.query(
      'SELECT * FROM Usuarios WHERE usuario = $1',
      [username],
    )
    return result.rows[0]
  }

  static async authenticate(username, password) {
    const result = await pool.query(
      'SELECT * FROM Usuarios WHERE usuario = $1 AND senha = crypt($2, senha)',
      [username, password],
    )
    return result.rows[0]
  }
}

module.exports = User
