import "./Form.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import InputMask from "react-input-mask";

import Logo from "../../../assets/heloo2.png";

import {
  closeCreateProject,
  createProject,
  listProjects,
  editProject,
} from "../../../store/Project/actions";

function Form() {
  const dispatch = useDispatch();
  const action = useSelector((state) => state.project.action);
  const project = useSelector((state) => state.project.project);

  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [valor, setValor] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [descricao, setDescricao] = useState("");

  const [viabilityOptions] = useState([
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
  ]);
  const [situationOptions] = useState([
    { value: "Planejado", label: "Planejado" },
    { value: "Em desenvolvimento", label: "Em desenvolvimento" },
    { value: "Cancelado", label: "Cancelado" },
    { value: "Concluído", label: "Concluído" },
  ]);
  const [viabilitySelected, setViabilitySelected] = useState({});
  const [situationSelected, setSituationSelected] = useState({});

  useEffect(() => {
    if (action === "edit") {
      let infDataInicio = project.data_inicio_previsto
        .substring(0, 10)
        .replace("-", "")
        .replace("-", "");
      let infDataFim = project.data_fim_prevista
        .substring(0, 10)
        .replace("-", "")
        .replace("-", "");

      let dataInicioFormatada = `${infDataInicio.substring(
        6,
        10
      )}/${infDataInicio.substring(4, 6)}/${infDataInicio.substring(0, 4)}`;

      let dataFimFormatada = `${infDataFim.substring(
        6,
        10
      )}/${infDataFim.substring(4, 6)}/${infDataFim.substring(0, 4)}`;

      setViabilitySelected({
        value: project.viabilidade,
        label: project.viabilidade,
      });
      setSituationSelected({
        value: project.situacao,
        label: project.situacao,
      });
      setDataInicio(dataInicioFormatada);
      setDataFim(dataFimFormatada);
      setValor(project.valor_execucao);
      setResponsavel(project.responsavel);
      setDescricao(project.descricao);
    }
  }, []);

  function createNewProject() {
    let dataInicioFormatada = dataInicio.replace("/", "").replace("/", "");
    let dataFimFormatada = dataFim.replace("/", "").replace("/", "");
    let dataInicoBanco = `${dataInicioFormatada.substring(
      4
    )}-${dataInicioFormatada.substring(2, 4)}-${dataInicioFormatada.substring(
      0,
      2
    )}`;

    let dataFimBanco = `${dataFimFormatada.substring(
      4
    )}-${dataFimFormatada.substring(2, 4)}-${dataFimFormatada.substring(0, 2)}`;

    const project = {
      situacao: situationSelected.value,
      viabilidade: viabilitySelected.value,
      data_inicio_previsto: dataInicoBanco,
      data_fim_prevista: dataFimBanco,
      valor_execucao: valor,
      responsavel,
      descricao,
    };

    dispatch(createProject(project));
    setTimeout(() => {
      dispatch(closeCreateProject("close"));
      dispatch(listProjects());
    }, 200);
  }

  function saveChanges() {
    let dataInicioFormatada = dataInicio.replace("/", "").replace("/", "");
    let dataFimFormatada = dataFim.replace("/", "").replace("/", "");

    let dataInicoBanco = `${dataInicioFormatada.substring(
      4
    )}-${dataInicioFormatada.substring(2, 4)}-${dataInicioFormatada.substring(
      0,
      2
    )}`;

    let dataFimBanco = `${dataFimFormatada.substring(
      4
    )}-${dataFimFormatada.substring(2, 4)}-${dataFimFormatada.substring(0, 2)}`;

    const projectData = {
      situacao: situationSelected.value,
      viabilidade: viabilitySelected.value,
      data_inicio_previsto: dataInicoBanco,
      data_fim_prevista: dataFimBanco,
      valor_execucao: valor,
      responsavel,
      descricao,
    };

    dispatch(editProject(project.id, projectData));
    setTimeout(() => {
      dispatch(closeCreateProject("close"));
      dispatch(listProjects());
    }, 200);
  }

  return (
    <div className="container-geral">
      <div className="container-btns">
        <div className="head-btns">
          <img src={Logo} alt="Logomarca" />
        </div>

        <div className="footer-btns">
          <button
            className="bntCancel"
            onClick={() => dispatch(closeCreateProject("close"))}
          >
            Cancelar
          </button>
          {action === "edit" ? (
            <button className="bntSave" onClick={() => saveChanges()}>
              Salvar
            </button>
          ) : (
            <button className="bntSave" onClick={() => createNewProject()}>
              Cadastrar
            </button>
          )}
        </div>
      </div>

      <div className="container-form">
        <form action="">
          <h2>Cadastre aqui o seu Projeto</h2>
          <div className="container-situation">
            <label>Situação:</label>
            <Select
              className="dropdown"
              value={situationSelected}
              options={situationOptions}
              onChange={(option) => setSituationSelected(option)}
            />

            <label>Viabilidade:</label>
            <Select
              className="dropdown"
              value={viabilitySelected}
              options={viabilityOptions}
              onChange={(option) => setViabilitySelected(option)}
            />
          </div>

          <div className="container-dates">
            <label>Data Ínicio:</label>

            <InputMask
              mask="99/99/9999"
              value={dataInicio}
              onChange={(text) => setDataInicio(text.target.value)}
              readOnly={action === "edit" ? "readonly" : ""}
            />

            <label>Data Fim:</label>
            <InputMask
              mask="99/99/9999"
              value={dataFim}
              onChange={(text) => setDataFim(text.target.value)}
              readOnly={action === "edit" ? "readonly" : ""}
            />
          </div>

          <div className="container-responsible">
            <label>Valor:</label>
            <input
              type="text"
              value={valor}
              onChange={(text) => setValor(text.target.value)}
              readOnly={action === "edit" ? "readonly" : ""}
            />

            <label>Responsável:</label>
            <input
              type="text"
              value={responsavel}
              onChange={(text) => setResponsavel(text.target.value)}
              readOnly={action === "edit" ? "readonly" : ""}
            />
          </div>

          <div className="container-description">
            <label className="label-description">Descrição</label>
            <textarea
              className="input-description"
              cols="30"
              rows="10"
              maxlength="255"
              value={descricao}
              onChange={(text) => setDescricao(text.target.value)}
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
