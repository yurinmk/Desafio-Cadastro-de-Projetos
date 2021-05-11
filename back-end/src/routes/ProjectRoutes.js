const express = require("express");

const router = express.Router();

const ProjectMiddlewares = require("../middlewares/ProjectMiddlewares");
const ProjectController = require("../controller/ProjectController");

router.get("/listProjects", ProjectController.listProjects);
router.post("/newProject", ProjectMiddlewares, ProjectController.createProject);
router.post("/filterProjects", ProjectController.filterProjects);
router.put(
  "/editProject/:id",
  ProjectMiddlewares,
  ProjectController.editProject
);

module.exports = router;
