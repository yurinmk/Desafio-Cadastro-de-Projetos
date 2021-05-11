import "./Tbody.css";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { motion, AnimatePresence } from "framer-motion";

import Acao from "../../../assets/acao.png";
import {
  handleEditProject,
  editProject,
  listProjects,
} from "../../../store/Project/actions";

function Tbody(props) {
  const { project } = props;
  const dispatch = useDispatch();
  const [openActions, setOpenActions] = useState(false);

  const [dataInicioFormatada, setDataInicioFormatada] = useState("");
  const [dataFimFormatada, setDataFimFormatada] = useState("");

  useEffect(() => {
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

    setDataInicioFormatada(dataInicioFormatada);
    setDataFimFormatada(dataFimFormatada);
  }, []);

  function handleAction() {
    const actions = ["Editar", "Concluir", "Cancelar"];
    return actions.map((action) => {
      return (
        <div
          key={action}
          className="item"
          onClick={() => {
            if (action === "Editar") {
              dispatch(handleEditProject("edit", project));
              setOpenActions(false);
            } else if (action === "Concluir") {
              completeProject();
              setOpenActions(false);
            } else if (action === "Cancelar") {
              cancelProject();
              setOpenActions(false);
            }
          }}
        >
          {action}
        </div>
      );
    });
  }

  function completeProject() {
    let dataAtual = new Date();
    let dia =
      dataAtual.getDate() > 10
        ? dataAtual.getDate()
        : `0${dataAtual.getDate()}`;
    let mes =
      dataAtual.getMonth() + 1 > 10
        ? dataAtual.getMonth() + 1
        : `0${dataAtual.getMonth() + 1}`;
    let ano = dataAtual.getFullYear();

    const projectData = {
      descricao: project.descricao,
      viabilidade: project.viabilidade,
      data_inicio_previsto: project.data_inicio_previsto,
      data_fim_prevista: project.data_fim_prevista,
      data_conclusao: project.data_conclusao,
      situacao: "Concluído",
      valor_execucao: project.valor_execucao,
      responsavel: project.responsavel,
      data_conclusao: `${ano}-${mes}-${dia}`,
    };

    dispatch(editProject(project.id, projectData));
    setTimeout(() => {
      dispatch(listProjects());
    }, 200);
  }

  function cancelProject() {
    const projectData = {
      descricao: project.descricao,
      viabilidade: project.viabilidade,
      data_inicio_previsto: project.data_inicio_previsto,
      data_fim_prevista: project.data_fim_prevista,
      data_conclusao: project.data_conclusao,
      situacao: "Cancelado",
      valor_execucao: project.valor_execucao,
      responsavel: project.responsavel,
    };

    dispatch(editProject(project.id, projectData));
    setTimeout(() => {
      dispatch(listProjects());
    }, 200);
  }

  return (
    <tr>
      <td>
        <div className="td-description">
          <div className={`situation-color-${project.viabilidade}`}></div>
          <div className="td-p">
            <p>{project.descricao}</p>
            {console.log(project.descricao.length)}
          </div>
        </div>
      </td>
      <td>
        <p>{project.viabilidade}</p>
      </td>
      <td>
        <p>{project.situacao}</p>
      </td>
      <td>
        <p>{dataInicioFormatada}</p>
      </td>
      <td>
        <p>{dataFimFormatada}</p>
      </td>
      <td>
        <p>R$: {project.valor_execucao}</p>
      </td>
      <td>
        <p>{project.responsavel}</p>
      </td>
      <td>
        <div className="container-action">
          <AnimatePresence>
            {openActions && (
              <>
                <motion.div
                  initial={{
                    scale: 0,
                  }}
                  animate={{
                    scale: 1,
                  }}
                  exit={{
                    scale: 0,
                  }}
                  className={openActions ? "actions-open" : "actions-close"}
                >
                  {handleAction()}
                </motion.div>
              </>
            )}
          </AnimatePresence>
          {project.situacao !== "Concluído" &&
            project.situacao !== "Cancelado" && (
              <img
                src={Acao}
                alt=""
                onClick={() => setOpenActions(!openActions)}
              />
            )}
        </div>
      </td>
    </tr>
  );
}

export default Tbody;
