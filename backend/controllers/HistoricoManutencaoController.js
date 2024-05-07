const HistoricoManutencao = require('../models/HistoricoManutencao');
const { Op } = require('sequelize');

const DEBUG = false;

class HistoricoManutencaoController {
  async create(req, res) {
    try {
      const historico = await HistoricoManutencao.create(req.body);
      if (DEBUG) console.log('Histórico de manutenção criado:', historico);
      return res.status(201).send(historico);
    } catch (error) {
      if (DEBUG) console.error('Erro ao criar histórico de manutenção:', error);
      return res.status(400).send(error);
    }
  }

  async getAll(req, res) {
    try {
      const historicos = await HistoricoManutencao.findAll();
      if (DEBUG) console.log('Todos os históricos de manutenção:', historicos);
      return res.status(200).send(historicos);
    } catch (error) {
      if (DEBUG) console.error('Erro ao buscar históricos de manutenção:', error);
      return res.status(400).send(error);
    }
  }

  async getByVeiculo(req, res) {
    try {
      const veiculo_id = req.params.veiculo_id;
      const historicos = await HistoricoManutencao.findAll({
        where: { veiculo_id: veiculo_id },
      });
      if (DEBUG) console.log(`Históricos de manutenção para o veículo ${veiculo_id}:`, historicos);
      return res.status(200).send(historicos);
    } catch (error) {
      if (DEBUG) console.error(`Erro ao buscar históricos de manutenção para o veículo ${veiculo_id}:`, error);
      return res.status(400).send(error);
    }
  }

  async update(req, res) {
    try {
      const historico = await HistoricoManutencao.findByPk(req.params.id);
      if (historico) {
        await historico.update(req.body);
        if (DEBUG) console.log(`Histórico de manutenção com ID ${req.params.id} atualizado:`, historico);
        return res.status(200).send(historico);
      }
      return res.status(404).send({ message: 'Histórico de manutenção não encontrado.' });
    } catch (error) {
      if (DEBUG) console.error(`Erro ao atualizar histórico de manutenção com ID ${req.params.id}:`, error);
      return res.status(400).send(error);
    }
  }

  async delete(req, res) {
    try {
      const historico = await HistoricoManutencao.findByPk(req.params.id);
      if (historico) {
        await historico.destroy();
        if (DEBUG) console.log(`Histórico de manutenção com ID ${req.params.id} excluído.`);
        return res.status(200).send({ message: 'Histórico de manutenção excluído com sucesso.' });
      }
      return res.status(404).send({ message: 'Histórico de manutenção não encontrado.' });
    } catch (error) {
      if (DEBUG) console.error(`Erro ao excluir histórico de manutenção com ID ${req.params.id}:`, error);
      return res.status(400).send(error);
    }
  }
}

module.exports = HistoricoManutencaoController;
