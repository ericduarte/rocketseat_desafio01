const express = require('express')

const server = express();

server.use(express.json());

const reqs = {count : 0}

server.use((res,req,next)=>{
  reqs.count++;

  console.log(`Number of requests: ${reqs.count}`);

  next();
})

const projects = []

function checkProjectExists(req, res, next){  
  
  const { id } = req.params; 
  if (!id) return next();
  
  const project = projects.find((project) =>{
    return project.id === id;
  }); 
  
    
  if(!project)
    return res.status.json({error:'Project not found'})    
  
  return next();
}

server.post('/projects',(req, res) => {  
  const {id,title} = req.body;  
  const project = {
    id:id,
    title:title,
    tasks:[]
  };
  projects.push(project); 
  return res.json(project);
})

server.get('/projects', (req, res)=>{
  return res.json(projects)
})


server.put('/projects/:id',checkProjectExists,(req, res) => {  
  const id = req.params.id;    
  const {title} = req.body;
  const project = projects.find((project) =>{
    return project.id === id;
  }) 
  project.title = title;
  return res.json(project);
})

server.put('/projects/:id/tasks',checkProjectExists,(req, res) => {  
  const id = req.params.id;    
  const {title} = req.body;
  const project = projects.find((project) =>{
    return project.id === id;
  })   
  project.tasks.push(title);
  return res.json(project);
})

server.delete('/projects/:id',checkProjectExists,(req, res) => {  
  const id = req.params.id;    
  const index = projects.findIndex((project) =>{
    return project.id === id;
  }) 
  projects.splice(index, 1);
  return res.json(projects);
})

server.listen(3001);
