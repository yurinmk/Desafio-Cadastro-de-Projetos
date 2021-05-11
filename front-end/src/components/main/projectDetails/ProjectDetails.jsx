import "./ProjectDetails.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Tbody from "./Tbody";
import Thead from "./Thead";

import CreateProject from "../createProject/CreateProject";
import { listProjects, stateReset } from "../../../store/Project/actions";

import ToastAnimated, { showToast } from "../../alerts/toast";

function ProjectDetails() {
  const dispatch = useDispatch();
  const projectList = useSelector((state) => state.project.items);
  const action = useSelector((state) => state.project.action);
  const project = useSelector((state) => state.project.project);
  const message = useSelector((state) => state.project.message);
  const statusCode = useSelector((state) => state.project.statusCode);

  useEffect(() => {
    dispatch(listProjects());
  }, []);

  function openModal() {
    switch (action) {
      case "create":
        return <CreateProject />;
      case "edit":
        return <CreateProject project={project} />;

      default:
        return null;
    }
  }

  function showMessages() {
    if (message !== "") {
      switch (statusCode) {
        case 200:
          showToast({ type: "success", message: message });
          dispatch(stateReset());
          break;
        case 500:
          showToast({ type: "error", message: message });
          dispatch(stateReset());
          break;

        default:
          break;
      }
    }
  }

  return (
    <div className="container-details">
      <div className="container-list">
        <table className="table">
          <thead>
            <Thead />
          </thead>
          <tbody>
            {projectList.map((project) => {
              return <Tbody key={project.id} project={project} />;
            })}
          </tbody>
        </table>
        {openModal()}
        {showMessages()}
        <ToastAnimated />
      </div>
    </div>
  );
}

export default ProjectDetails;
