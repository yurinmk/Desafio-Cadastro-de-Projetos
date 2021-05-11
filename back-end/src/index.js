require("dotenv").config();
const express = require("express");
const cors = require("cors");

const server = express();
const app_port = process.env.APP_PORT;
const ProjectRoutes = require("./routes/ProjectRoutes");

server.use(cors());
server.use(express.json());

server.use("/", ProjectRoutes);

server.get("/", (req, res) => {
  res.send("Hello World");
});

//criação das tabelas automaticamente

// (async () => {
//   const database = require("./config/database");
//   try {
//     const resultado = await database.sync();
//   } catch (error) {
//     console.log(error);
//   }
// })();

server.listen(app_port, () => {
  console.log(`♠♠ Server running on the port: ${app_port} ♠♠`);
});
