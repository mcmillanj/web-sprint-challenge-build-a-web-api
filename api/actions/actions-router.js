// Write your "actions" router here!
const express = require("express");

const {
  validatePost,
  validateActionId,
  validateAction,
} = require("../actions/actions-middlware");

const Action = require("../actions/actions-model");

const router = express.Router();

router.get("/", (req, res, next)=>{

  Action.get()
    
    .then((actions)=> {

      res.status(200).json(actions);
      console.log(actions);
    })
    .catch(next);
});

router.get("/:id",validateActionId,(req, res) => {
  res.json(req.action);
});





router.post("/",validatePost,(req,res,next)=>{
  Action.insert(req.body)
  //const body = req.body
//if (!body.project_id || !body.description ) {
 //res.status(400).json({ message: " fills are missing"})

    .then((action) =>{
      console.log(action)
      res.status(201).json(action);
    })
    .catch(next);
});



// router.put('/api/actions/:id', async (req, res) => {
//   const {id} = req.params;
//   const body = req.body;
router.put("/:id", validateActionId,validateAction,(req,res,next)=>{
  Action.update(req.params.id, req.body)

    .then((action) => {
      res.status(200).json(action);
      console.log(action)
    })
    .catch(next);
});


//bad does not work 
// router.delete('/:id', async (req,res) => {
//   const {id} = req.params
  
//   try {
//    const deletedAction = await Action.remove(id)
//    if ( deletedAction) {
//     res.status(404).json({ message: "action does not exits"})
//    } else {
//     res.status(200).json(Actiondeleted)
//    }




router.delete("/:id", validateActionId,(req,res,next)=>{
  Action.remove(req.params.id)
  //eslint complaining on action
    .then(action => {
      res.json(req.action);
      console.log(req.action);
    })
    //   }catch (err) {
//    res.status(404).json({ error: {err} })
        .catch(error => {
      next(error);
    });
   
});

module.exports = router;