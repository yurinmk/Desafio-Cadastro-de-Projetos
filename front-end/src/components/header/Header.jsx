import "./Header.css";
import React from "react";

import Logo from "../../assets/heloo.png";
import Plus from "../../assets/plus.png";
import { handleCreateProject } from "../../store/Project/actions";

import { useDispatch } from "react-redux";

function Header() {
  const dispatch = useDispatch();

  return (
    <div className="container-header">
      <div className="container-logo">
        <img src={Logo} alt="Logomarca" />
        <h1>Cadastro de Projetos</h1>
      </div>
      <div
        className="btn"
        onClick={() => dispatch(handleCreateProject("create"))}
      >
        <img src={Plus} alt="Cadastrar Projeto" />
      </div>
    </div>
  );
}

export default Header;
