// add middlewares here related to projects
const Action= require("../actions/actions-model");






const validatePost = (req,res,next)=> {
  // if (!req.id||!req.description)
   //res.status(404).json(message: "missing  fields",)
    // next();
// }else{
//   next();
// }
  if (!req.body.project_id||!req.body.description||!req.body.notes) {

    next({status: 400,message: "missing  fields",

    });

  } else {
    next();
  }
};


// const validateActionId = async (req,res,next) => {
//   const {id} = req.params
//   try {
//    const projectAction = await Projects.get(id)
//    if(!project){
//     res.status(400).json({message:`theres no project with id`})
//    }else{
//     req.project = project
//     next()
//    }



const validateActionId = async (req, res, next) => {
  try {
    const { id }= req.params;

    const action = await Action.get(id);
    console.log(action);
    if (action) {
      req.action = action;
      next();
    } else {
      //res.status(404).json({message:"actions not avaialable"})
      next({status: 404,message: "action not avaialable",
      });
    }
  } catch (err) {
    next(err);
  }
};



// const validateAction = (req,res,next) =>{
//   if (req.body.name || !req.body.description) {
//       res.status(400).json({ message: 'you have to put  name and description' })
//   } else {
//       next()
//   }
// }
const validateAction = async (req, res, next) => {
  if (!req.body.project_id||!req.body.description||!req.body.notes ){

    next({ status: 400, message: "you have to put  name and description",
    });
  }
   else {
    next();
  }
};

module.exports = {
  validatePost,
  validateActionId,
  validateAction,
};