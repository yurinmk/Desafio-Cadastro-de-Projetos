import "./Thead.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Calendar from "react-calendar";
import { motion, AnimatePresence } from "framer-motion";

import Filter from "../../../assets/filter.png";
import Clean from "../../../assets/limpar.png";
import { filterProjects } from "../../../store/Project/actions";
import "react-calendar/dist/Calendar.css";

function Thead() {
  const dispatch = useDispatch();
  const [openViabilidade, setOpenViabilidade] = useState(false);
  const [openSituacao, setOpenSituacao] = useState(false);
  const [openData, setOpenData] = useState(false);
  const [dateSelected, setDateSelected] = useState("");

  function itensViability() {
    const itens = ["Todos", "1", "2", "3", "4", "5"];
    return itens.map((item) => {
      return (
        <div
          key={item}
          className="item"
          onClick={() => {
            setOpenViabilidade(!openViabilidade);
            filter("viabilidade", item);
          }}
        >
          {item}
        </div>
      );
    });
  }

  function filter(filter, value) {
    dispatch(filterProjects(filter, value));
  }

  function itensSituation() {
    const itens = [
      "Todos",
      "Planejado",
      "Cancelado",
      "Concluído",
      "Em desenvolvimento",
    ];
    return itens.map((item) => {
      return (
        <div
          key={item}
          className="item"
          onClick={() => {
            setOpenSituacao(!openSituacao);
            filter("situacao", item);
          }}
        >
          {item}
        </div>
      );
    });
  }

  return (
    <>
      <tr>
        <th>
          <div className="th-description">
            <p>Descrição</p>
          </div>
        </th>

        <th>
          <div className="th-filter">
            <div className="dropdown-list">
              <div className="head-filter">
                <p>Viabilidade</p>

                <div
                  className="filter"
                  onClick={() => setOpenViabilidade(!openViabilidade)}
                >
                  <img src={Filter} alt="Filtrar" />
                </div>
              </div>
              <AnimatePresence>
                {openViabilidade && (
                  <>
                    <motion.div
                      initial={{
                        y: 0,
                        scale: 0,
                      }}
                      animate={{
                        y: 0,
                        scale: 1,
                      }}
                      exit={{
                        y: -20,
                        scale: 0,
                      }}
                      className={openViabilidade ? "itens-open" : "itens-close"}
                    >
                      {itensViability()}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </th>

        <th>
          <div className="th-filter">
            <div className="dropdown-list">
              <div className="head-filter">
                <p>Situação</p>

                <div
                  className="filter"
                  onClick={() => setOpenSituacao(!openSituacao)}
                >
                  <img src={Filter} alt="Filtrar" />
                </div>
              </div>

              <AnimatePresence>
                {openSituacao && (
                  <>
                    <motion.div
                      initial={{
                        y: 0,
                        scale: 0,
                      }}
                      animate={{
                        y: 0,
                        scale: 1,
                      }}
                      exit={{
                        y: -20,
                        scale: 0,
                      }}
                      className={openSituacao ? "itens-open" : "itens-close"}
                    >
                      {itensSituation()}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </th>

        <th>
          <div className="th-filter">
            <div className="dropdown-list">
              <div className="head-filter">
                <p>Data Ínicio</p>

                <div className="filter" onClick={() => setOpenData(!openData)}>
                  <img src={Filter} alt="Filtrar" />
                </div>
                <div
                  className="filter"
                  onClick={() => {
                    filter("", "Todos");
                  }}
                >
                  <img src={Clean} alt="Limpar" />
                </div>
              </div>
              <AnimatePresence>
                {openData && (
                  <>
                    <motion.div
                      initial={{
                        y: 0,
                        scale: 0,
                      }}
                      animate={{
                        y: 0,
                        scale: 1,
                      }}
                      exit={{
                        y: -20,
                        scale: 0,
                      }}
                      className={openData ? "itens-open" : "itens-close"}
                    >
                      <div className="date">
                        <Calendar
                          onChange={(date) => {
                            let teste = new Date(Date.parse(date));

                            let dia =
                              teste.getDate() > 10
                                ? teste.getDate()
                                : `0${teste.getDate()}`;
                            let mes =
                              teste.getMonth() + 1 > 10
                                ? teste.getMonth() + 1
                                : `0${teste.getMonth() + 1}`;
                            let ano = teste.getFullYear();

                            let formattedDate = `${ano}-${mes}-${dia}`;
                            filter("data", formattedDate);
                          }}
                          onClickDay={() => {
                            setOpenData(!openData);
                          }}
                        />
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </th>

        <th>
          <p>Data de fim</p>
        </th>

        <th>
          <p>Valor</p>
        </th>

        <th>
          <p>Responsável</p>
        </th>

        <th>
          <p>Ações</p>
        </th>
      </tr>
    </>
  );
}

export default Thead;
