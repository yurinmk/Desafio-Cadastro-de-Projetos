const Sequelize = require("sequelize");
const connection = require("../config/database");

const Project = connection.define("tbl_projetos", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  descricao: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  viabilidade: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  data_inicio_previsto: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  data_fim_prevista: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  data_conclusao: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  situacao: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  valor_execucao: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  responsavel: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Project;
