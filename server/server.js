const express=require('express');
const app=express();


let applications=[
     {id:1,company:"Flipkart",role:"part time intern",status:"open"},
     {id:2,company:"Zepto",role:"full time intern",status:"closed"},
     {id:3,company:"Paytm",role:"remote intern",status:"open"}
   ]

//Middleware shld be before all routes
app.use(express.json());//parse json data from browser

app.get('/internships',(req,res)=>{
   res.json(applications);
});

app.post('/internships',(req,res)=>{
    const {company,role,status}=req.body;
     const id=applications[applications.length-1].id+1;
     let newApplication={id,company,role,status};
     applications.push(newApplication);
     res.json(applications);
});

app.put("/internships/:id",(req,res)=>{
      const id=Number(req.params.id);//we get always as string so convert to no
      //Find application
      const application=applications.find(application=>application.id===id);
      if(!application){
        return res.json("Id doesnt exitst");
      }
      const {company,role,status}=req.body;//extract value from body;
      //insert in variables;
      application.company=company;
      application.role=role;
      application.status=status;
      res.json(applications);
});
app.delete("/internships/:id",(req,res)=>{
   const id=Number(req.params.id);
   //check if id exits
     const application=applications.find(application=>application.id===id);
     if(!application){
      return res.status(404).json("Application Not found");
     }

   //if exits remove it
   applications=applications.filter(application=>application.id!==id);
  res.json(applications);
});

app.listen(3000,()=>{
    console.log('Server running on http://localhost:3000');
})