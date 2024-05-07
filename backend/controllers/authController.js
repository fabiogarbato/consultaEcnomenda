const User = require('../models/User')

const login = async (req, res) => {
  const { usuario, senha } = req.body

  if (!usuario || !senha) {
    return res.status(400).json({ message: 'Preencha usuário e senha!' })
  }

  try {
    const user = await User.findByUsername(usuario)

    if (!user) {
      return res.status(401).json({ message: 'Usuário inválido!' })
    }

    const authenticatedUser = await User.authenticate(usuario, senha)

    if (authenticatedUser) {
      res.json({
        message: 'Usuário autenticado com sucesso!',
        usuario: authenticatedUser,
      })
    } else {
      res.status(401).json({ message: 'Senha inválida!' })
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ message: 'Erro ao autenticar o usuário' })
  }
}

module.exports = {
  login,
}
