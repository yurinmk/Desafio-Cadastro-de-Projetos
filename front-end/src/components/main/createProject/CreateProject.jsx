import "./CreateProject.css";
import React from "react";
import Form from "./Form";
import { motion } from "framer-motion";

// import { Container } from './styles';

function CreateProject() {
  return (
    <>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        className="modal-backdrop"
      ></motion.div>
      <motion.div
        initial={{
          scale: 0,
        }}
        animate={{
          scale: 1,
        }}
        className="modal-content-wrapper"
      >
        <Form />
      </motion.div>
    </>
  );
}

export default CreateProject;
