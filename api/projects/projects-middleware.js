// add middlewares here related to projects
const Projects = require('../projects/projects-model')





async function validateProjectId(req, res, next) {
  try {
    const { id } = req.params;
    const project = await Projects.get(id);
    // if (!project) {
    //   res.status(400).json({ message: `No project with Id:${id}` });
    // } else {
    //   req.projects = project;
    //   next();
    if (project) {
      req.project = project;
      next();
    } else {
      next({status: 404,message: "no project", });
    }
  } catch (err) {
    next(err);
  }
}

async function validateProject(req,res,next) {

  const {name,description,completed}= req.body;

  if (!name ||!description||!name.trim()) {
    res.status(400).json({
      message: "missing name  ",
    });

  } else if (!description||!description.trim()) {
    res.status(400).json({
      message: "missing description",
    });
  } else {
    req.name = name.trim();
    req.description = description.trim();
    req.completed = completed;
    next();
  }
}
module.exports = {
  validateProjectId,
  validateProject,
};