const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");

const Button1 = document.getElementById("button1");

const todo   = document.getElementById('todo');

const show1  = document.getElementById('show1');
const show2  = document.getElementById('show2');


Button1.addEventListener("click",()=>{
  
    let obj = {NoteTitle:input1.value, Notedesc:input2.value};

   axios.post("https://crudcrud.com/api/e14d6710ce424829a66859316027d95c/Notebook",obj)
   .then((response)=>{
    showdata(response.data)
   })
   .catch((err)=>{
    console.log(err);
    document.body.innerHTML = document.body.innerHTML + "<h4>something went wrong</h4>";
   })
     
})

todo.addEventListener("click", (event)=>{
    if (event.target.classList.contains("delete-btn")) {
   const id =   event.target.parentElement.getAttribute('id');
    axios.delete(`https://crudcrud.com/api/e14d6710ce424829a66859316027d95c/Notebook/${id}`)
    .then((response) =>{
        console.log(response);
    })
    .catch((error)=>{
        console.log(error);
    })
      const fruitToDelete = event.target.parentElement;
      todo.removeChild(fruitToDelete);
    }
    count_change_karo();
    showing_total();
  });



document.getElementById("filter").addEventListener("keyup", function (event) {
    const searchTerm = event.target.value.toLowerCase();
    const listItems = document.querySelectorAll("#todo li");
    for (let i = 0; i < listItems.length; i++) {
      const currentFruitText = listItems[i].firstChild.textContent.toLowerCase();
      if (
        currentFruitText.indexOf(searchTerm) === -1
      ) {
        listItems[i].style.display = "none";
      } else {
        listItems[i].style.display = "flex";
      }
    }
    showing_total();
  });


function count_change_karo(){
  const listItems = document.querySelectorAll('#todo li');
  let count = listItems.length
  show1.innerHTML = count;
  show2.innerHTML = count;
}


function showing_total(){
   const listItems = document.querySelectorAll('#todo li');
   let count = 0;
   for(let i =0 ; i<listItems.length; i++){
    if(listItems[i].style.display == "flex"){
      count++;
   }}
   show2.innerHTML = count;
}

function showdata(object){

  
  const newli = document.createElement("li");
  const newh1 = document.createElement("h1");
  newh1.className = "search";
  const newh4 = document.createElement("h4");
 
   newh1.innerHTML = object.NoteTitle;
   newh4.innerHTML = object.Notedesc;
  

   newli.appendChild(newh1);
   newli.appendChild(newh4);

   todo.appendChild(newli);
 
   const newDelete = document.createElement("button");
   const newDeleteText = document.createTextNode("delete");



   newDelete.appendChild(newDeleteText);
   newDelete.className = "delete-btn";
   newli.appendChild(newDelete);
   newli.id = object._id;

   
   count_change_karo();

}


window.addEventListener("DOMContentLoaded",()=>{
  axios.get("https://crudcrud.com/api/e14d6710ce424829a66859316027d95c/Notebook")
    .then((response)=>{
      for(var i=0;i<response.data.length; i++){
        showdata(response.data[i])
      }
    })
    .catch((error)=>{
      console.log(error);
    })
})


