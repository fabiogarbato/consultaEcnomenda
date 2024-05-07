const Veiculo = require('../models/Veiculo')
const Manutencao = require('../models/HistoricoManutencao');
const { Op } = require('sequelize')

const DEBUG = false

class VeiculoController {
  async create(req, res) {
    try {
      const veiculo = await Veiculo.create(req.body)
      if (DEBUG) console.log('Veículo criado:', veiculo)
      return res.status(201).send(veiculo)
    } catch (error) {
      if (DEBUG) console.error('Erro ao criar veículo:', error)
      return res.status(400).send(error)
    }
  }

  async getAll(req, res) {
    try {
      const veiculos = await Veiculo.findAll()
      if (DEBUG) console.log('Todos os veículos:', veiculos)
      return res.status(200).send(veiculos)
    } catch (error) {
      if (DEBUG) console.error('Erro ao buscar veículos:', error)
      return res.status(400).send(error)
    }
  }

  async checkDependencies(req, res) {
    const veiculoId = req.params.id;
    const manutencoes = await Manutencao.findAll({
      where: { veiculo_id: veiculoId }
    });
  
    if (manutencoes.length > 0) {
      return res.status(400).json({ message: 'Veículo possui manutenções associadas e não pode ser excluído.' });
    }
  
    return res.status(200).json({ message: 'Veículo pode ser excluído.' });
  }

  async search(req, res) {
    try {
      const searchTerm = req.query.search
      const veiculos = await Veiculo.findAll({
        where: {
          [Op.or]: [
            { placa: { [Op.like]: `%${searchTerm}%` } },
            { marca: { [Op.like]: `%${searchTerm}%` } },
            { modelo: { [Op.like]: `%${searchTerm}%` } },
          ],
        },
      })
      if (DEBUG)
        console.log(
          `Veículos encontrados para o termo de pesquisa "${searchTerm}":`,
          veiculos,
        )
      return res.status(200).send(veiculos)
    } catch (error) {
      if (DEBUG)
        console.error(
          `Erro ao buscar veículos para o termo de pesquisa "${req.query.search}":`,
          error,
        )
      return res.status(400).send(error)
    }
  }

  async verificarPlaca(req, res) {
    try {
      const placa = req.params.placa;
      const veiculo = await Veiculo.findOne({
        where: { placa: placa },
      });
      if (veiculo) {
        return res.status(200).send({ existe: true });
      } else {
        return res.status(200).send({ existe: false });
      }
    } catch (error) {
      if (DEBUG) console.error(`Erro ao verificar a placa "${placa}":`, error);
      return res.status(400).send(error);
    }
  }  

  async update(req, res) {
    try {
      const veiculo = await Veiculo.findByPk(req.params.id)
      if (veiculo) {
        await veiculo.update(req.body)
        if (DEBUG)
          console.log(`Veículo com ID ${req.params.id} atualizado:`, veiculo)
        return res.status(200).send(veiculo)
      }
      return res.status(404).send({ message: 'Veículo não encontrado.' })
    } catch (error) {
      if (DEBUG)
        console.error(
          `Erro ao atualizar veículo com ID ${req.params.id}:`,
          error,
        )
      return res.status(400).send(error)
    }
  }

  async delete(req, res) {
    try {
      const veiculo = await Veiculo.findByPk(req.params.id)
      if (veiculo) {
        await veiculo.destroy()
        if (DEBUG) console.log(`Veículo com ID ${req.params.id} excluído.`)
        return res
          .status(200)
          .send({ message: 'Veículo excluído com sucesso.' })
      }
      return res.status(404).send({ message: 'Veículo não encontrado.' })
    } catch (error) {
      if (DEBUG)
        console.error(`Erro ao excluir veículo com ID ${req.params.id}:`, error)
      return res.status(400).send(error)
    }
  }
}

module.exports = VeiculoController
