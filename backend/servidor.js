const express = require('express')
const cors = require('cors')

const authController = require('./controllers/authController')
const VeiculoController = require('./controllers/VeiculoController')
const HistoricoManutencaoController = require('./controllers/HistoricoManutencaoController')

const app = express()
app.use(cors())
app.use(express.json())

app.post('/login', authController.login)

const veiculoController = new VeiculoController()

app.post('/veiculos', veiculoController.create)
app.get('/veiculos', veiculoController.getAll)
app.get('/veiculos/search', veiculoController.search)
app.get('/veiculos/:id/check-dependencies', veiculoController.checkDependencies) 
app.get('/veiculos/placa/:placa', veiculoController.verificarPlaca)
app.put('/veiculos/:id', veiculoController.update)
app.delete('/veiculos/:id', veiculoController.delete)

const historicoManutencaoController = new HistoricoManutencaoController()

app.post('/historicoManutencao', historicoManutencaoController.create)
app.get('/historicoManutencao', historicoManutencaoController.getAll);
app.get('/historicoManutencao/veiculo/:veiculo_id', historicoManutencaoController.getByVeiculo);
app.put('/historicoManutencao/:id', historicoManutencaoController.update);
app.delete('/historicoManutencao/:id', historicoManutencaoController.delete);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
