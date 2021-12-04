// Write your "projects" router here!
const express = require("express");
const Project = require("./projects-model");
const { validateProjectId, validateProject } = require("./projects-middleware");
// const { route } = require("../server");
const router = express.Router();


router.get("/", (req,res,next) => {
  Project.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((error) => {
      next(error);
      // res.status(404).json({ message: `Error:${error}` });
    });
});




router.get("/:id", validateProjectId, (req,res,next) => {
 //const id = req.params.id;
  try {
    res.json(req.project);

  } catch (error) {
    next(error);
  }
});


// router.post('/:id', validateProjectId, validateProjectId,(req,res,next)=>{
//   const changes = req.body
//   const id = req.params.id
//   Projects.update({id, {name: req.name,description: req.description,
 //     completed: req.completed,})
//   .then((projects)=>{
//       res.status(202).json(projects)
//   })
//.catch(err => {
  // next(error)
//})
// })




router.post("/", validateProject, async (req, res, next) => {
  try {
    const newProject = await Project.insert({name: req.name,description: req.description,
      completed: req.completed,
    });
    res.status(201).json(newProject);

  } catch (error) {
    next(error);
  }
});

router.put("/:id", validateProjectId, validateProject, (req, res, next) => {
  Project.update(req.params.id, req.body)
    .then((project) => {
      res.status(400).json(project);
    })
    .catch(next);
});

router.delete("/:id", validateProjectId, async (req, res, next) => {
  try {
    await Project.remove(req.params.id);
    res.json(res.Project);
  } catch (error) {
    next(error);
  }
});



module.exports = router;
