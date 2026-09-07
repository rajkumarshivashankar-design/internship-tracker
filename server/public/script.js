let editingId=null;//used to edit internship

const container=document.getElementById("internships");

//SEARCH
const search=document.getElementById("search");

//FILTER
const statusFilter=document.getElementById("statusFilter");
statusFilter.addEventListener("change",filterInternships);

//Dashboard Elements
const totalCount=document.getElementById("totalCount");
const openCount=document.getElementById("openCount");
const closedCount=document.getElementById("closedCount");


let internships=[];
search.addEventListener("input",filterInternships);

    function filterInternships(){
    //filtering based on search
    const text=search.value.toLowerCase();
    const status=statusFilter.value;
    const filtered=internships.filter(internship=>
        (internship.company.toLowerCase().includes(text) ||
        internship.role.toLowerCase().includes(text) ||
        internship.location.toLowerCase().includes(text) )&&
        (status==="all" || internship.status===status)   
     );
    loadInternships(filtered);
     
    }
//GET
async function loadInternships(data=null){
 container.innerHTML="";
 if(data===null){
const response=await fetch("/internships");
data=await response.json();
internships=data;//data is stored in internships array

//Update Dashboard 
totalCount.textContent=internships.length;
openCount.textContent=internships.filter(internship=>internship.status==="Open").length;
closedCount.textContent=internships.filter(internship=>internship.status==="Closed").length;
 }
            data.forEach(internship=>{
                const card=document.createElement("div");
                const details=document.createElement("div");
                details.innerHTML=`
                    <h2>${internship.company}</h2>
                    <p>${internship.role}</p>
                    <p>${internship.status}</p>
                    <p>${internship.location}</p>
                    <a href="${internship.jobUrl}">Apply</a>
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
                card.appendChild(details);
                card.appendChild(editButton); 
                card.appendChild(deleteButton); 
                container.appendChild(card);
        });
}
//function call (GET)
loadInternships();
           
    

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
    const jobUrl=document.getElementById("jobUrl").value;
 
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
            company,role,status,location,jobUrl
         })
         
    });
    console.log({company, role, status, location, jobUrl});
          //fetch (read response sent by server) 
         const internship=await response.json();
         console.log(internship);

          await loadInternships();//gets all updated internships
    }
    else{
        //PUT code
        
        const response = await fetch(`/internships/${editingId}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        company,
        role,
        status,
        location,
        jobUrl
    })
});

const internship = await response.json();

console.log(internship);
await loadInternships();//get all the updated internships
editingId=null; //reset the value back to null
    }
});
