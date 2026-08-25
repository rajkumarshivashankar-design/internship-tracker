let editingId=null;//used to edit internship

const container=document.getElementById("internships");

//GET
fetch("/internships")
        .then(response=>response.json())
        .then(data=>{
            
            data.forEach(internship=>{
                const card=document.createElement("div");
                card.innerHTML=`
                    <h2>${internship.company}</h2>
                    <p>${internship.role}</p>
                    <p>${internship.status}</p>
                    <p>${internship.location}</p>
                `;
                //add delete button
                const deleteButton=document.createElement("button");
                deleteButton.textContent="Delete";
                deleteButton.dataset.id=internship.id;//create html
                //when delete button clicked

                deleteButton.addEventListener("click",async ()=>{
                     const id=deleteButton.dataset.id;
                     const response=await fetch(`/internships/${id}`,{
                                 method:"DELETE"
                     });
                     card.remove();
                });
                //add edit button
                const editButton=document.createElement("button");
                editButton.textContent="Edit";
                editButton.dataset.id=internship.id;
                editButton.addEventListener("click",async()=>{
                    editingId=internship.id;//change editingId defined at top
                         document.getElementById("company").value=internship.company;
                         document.getElementById("role").value=internship.role;                     
                         document.getElementById("status").value=internship.status;
                         document.getElementById("location").value=internship.location;
                   
                     
                });
                card.appendChild(editButton);
                card.appendChild(deleteButton); 
                container.appendChild(card);
        });
    });

//connect form to backend (POST)
const form=document.getElementById("internshipForm");

//when form submitted call backend

form.addEventListener("submit",async(event)=>{
   event.preventDefault();//prevent default browser submission (i.e reloding/navigate back)
    
   //taking form valuse and sending to backend
   const company=document.getElementById("company").value;
    const role=document.getElementById("role").value;
    const status=document.getElementById("status").value;
    const location=document.getElementById("location").value;
 
    if(editingId===null){//POST
         //fetch send request(response variable)
    const response=await fetch("/internships",{
         method:"POST" , //by default method is "GET"
   
         //headers (say wt type of data u r sending)
         headers:{
            "Content-Type":"application/json"
         },

         //body(stringify because we use app.use(express.json()) middleware in backend)
         body:JSON.stringify({
            company,role,status,location
         })
    });
          //fetch (read response sent by server) 
         const internship=await response.json();
         console.log(internship);

         //Display on screen
         const card=document.createElement("div");
          card.innerHTML=`
                    <h2>${internship.company}</h2>
                    <p>${internship.role}</p>
                    <p>${internship.status}</p>
                    <p>${internship.location}</p>
                `;
                container.appendChild(card);
    }
    else{//PUT code
          const response = await fetch(`/internships/${editingId}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        company,
        role,
        status,
        location
    })
});

const internship = await response.json();

console.log(internship);
    }
});

//delete a response