const ProjectMiddlewares = (request, response, next) => {
  const {
    descricao,
    viabilidade,
    data_inicio_previsto,
    data_fim_prevista,
    situacao,
    valor_execucao,
    responsavel,
  } = request.body;

  if (!descricao) {
    return response
      .status(500)
      .json({ error: "Descrição é um campo obrigatório!" });
  } else if (!viabilidade) {
    return response
      .status(500)
      .json({ error: "Viabilidade é um campo obrigatório!" });
  } else if (!data_inicio_previsto) {
    return response
      .status(500)
      .json({ error: "Data de ìnicio é um campo obrigatório!" });
  } else if (!data_fim_prevista) {
    return response
      .status(500)
      .json({ error: "Data de finalização é um campo obrigatório!" });
  } else if (!situacao) {
    return response
      .status(500)
      .json({ error: "Situação é um campo obrigatório!" });
  } else if (!valor_execucao) {
    return response
      .status(500)
      .json({ error: "Valor da execução é um campo obrigatório!" });
  } else if (!responsavel) {
    return response
      .status(500)
      .json({ error: "Responsavel é um campo obrigatório!" });
  } else {
    next();
  }
};

module.exports = ProjectMiddlewares;
