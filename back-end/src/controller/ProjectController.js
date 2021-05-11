const ProjectModel = require("../model/ProjectModel");

class ProjectController {
  async createProject(request, response) {
    const project = new ProjectModel(request.body);

    await project
      .save()
      .then(() => {
        return response
          .status(200)
          .json({ success: "Projeto cadastrado com sucesso!" });
      })
      .catch((error) => {
        return response
          .status(500)
          .json({ error: "Algo deu errado, tente novamente!" });
      });
  }

  async listProjects(request, response) {
    const projects = await ProjectModel.findAll();

    if (projects.length) {
      return response.status(200).json({ success: projects });
    } else {
      return response.status(500).json({
        error:
          "Não existe nenhum projeto cadastrado, favor cadastre um para poder vizualizar!",
      });
    }
  }

  async editProject(request, response) {
    const { id } = request.params;

    await ProjectModel.update(request.body, { where: { id: id } })
      .then(() => {
        return response
          .status(200)
          .json({ success: "Projeto atualzaido com sucesso!" });
      })
      .catch(() => {
        return response.status(500).json({
          error: "Não foi possível editar o projeto, tente novamente!",
        });
      });
  }

  async filterProjects(request, response) {
    const { filter, value } = request.body;

    if (value === "Todos") {
      const allResults = await ProjectModel.findAll();
      if (allResults.length) {
        return response.status(200).json({ success: allResults });
      } else {
        return response
          .status(500)
          .json({ error: "Nenhum resultado foi encontrado!" });
      }
    } else {
      switch (filter) {
        case "situacao":
          const situationResults = await ProjectModel.findAll({
            where: { situacao: value },
          });
          if (situationResults.length) {
            return response.status(200).json({ success: situationResults });
          } else {
            return response
              .status(500)
              .json({ error: "Nenhum resultado foi encontrado!" });
          }
        case "viabilidade":
          const viabilityResults = await ProjectModel.findAll({
            where: { viabilidade: value },
          });
          if (viabilityResults.length) {
            return response.status(200).json({ success: viabilityResults });
          } else {
            return response
              .status(500)
              .json({ error: "Nenhum resultado foi encontrado!" });
          }
        case "data":
          console.log(value);
          const dateResults = await ProjectModel.findAll({
            where: { data_inicio_previsto: value.toString() },
          });
          if (dateResults.length) {
            return response.status(200).json({ success: dateResults });
          } else {
            return response
              .status(500)
              .json({ error: "Nenhum resultado foi encontrado!" });
          }
      }
    }
  }
}

module.exports = new ProjectController();
