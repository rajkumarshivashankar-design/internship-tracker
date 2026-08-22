import express from "express";
import { prisma } from "./lib/prisma.js";
const app=express();


//Middleware shld be before all routes
app.use(express.json());//parse json data from browser

app.get('/internships',async (req,res)=>{
   const internships=await prisma.internship.findMany();
   res.json(internships);
});

app.post('/internships',async (req,res)=>{
    const {company,role,status,location}=req.body;
    //check if any value sent is invalid/empty

    if(!company || !role || !status || !location){
      return res.status(404).json({
        error:"All fields are required"
      });
    }
    
    try{ const internship=await  prisma.internship.create({
          data:{
      company,role,status,location
     }
     });
     res.json(internship);
    }catch(error){
      res.status(400).json({
      error:"Invalid Details"
      });
    } 
});

app.put("/internships/:id",async (req,res)=>{
      const id=Number(req.params.id);//we get always as string so convert to no
      const {company,role,status,location}=req.body;//extract  value from body;
      //insert in variables;
      if(!company || !role || !status || !location){
      return res.status(400).json({
        error:"All fields are required"
      });
    }
      
      //Find application
      try{
      const updateId=await prisma.internship.findUnique({
        where:{
          id:id
        }
      });
     
      
      const internship=await prisma.internship.update({
        where:{
           id:id,
        },
        data:{
          company,role,status,location
        }
        });
        res.json(internship);
      }catch(error){
       res.status(404).json({
          error:"Intership not found"
       });
        
      
      }
});

app.delete("/internships/:id",async (req,res)=>{
   const id=Number(req.params.id);
   //check if id exits
    try{
     const internship=await prisma.internship.delete({
      where:{
        id:id
      }
     });
     res.json(internship);
    }
     catch(error){
      res.status(404).json({
        error:"Internship not foung"
      });
     }
});

app.listen(3000,()=>{
    console.log('Server running on http://localhost:3000');
})