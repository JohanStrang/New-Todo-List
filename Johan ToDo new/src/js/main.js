// Handtag till objekten
// todo-form
const todoForm = document.querySelector('.todo-form');
// input box
const todoInput = document.querySelector('.todo-input');
// <ul> class="todo-items"
const todoItemsList = document.querySelector('.todo-items');
//Delete All knappen
const deleteAll = document.getElementById('deleteAllToDo')
let inputField = document.getElementById('inputField')


//Definiera en class ToDo. Har inte använt deleted än men har med den för framtiden
class ToDo {
  constructor(id, todotext, done, deleted) {
    this.id=id;
    this.todotext = todotext;
    this.done = done;
    this.deleted = deleted;
  }
}

let todos =[];

let state ="All"; //för att veta vad man ska visa när man klarmarkerat 
showAll.setAttribute("class", "markedbtn"); //markerar knappen Alla


//funktionen agrar i LS
function storeToLS (todos) {
  let myTodoAssString = JSON.stringify (todos);
  localStorage.setItem("todos", myTodoAssString);
}

//Läser upp från LS och visar på skärmen och håller koll på state vilka som sak visas
function getFromLS() {
const todosFromLS = localStorage.getItem("todos");
if(todosFromLS){
  todos=JSON.parse(todosFromLS);
  //Kallar på funktionen som visar listan från Local Storage

if (state === "All") {
  showTodoList(todos);
} else {
  if (state === "Active") {
  showActiveList(todos);
  } else {
  showDoneList(todos);
  }
}

}
}

//Visar från början
getFromLS();

//Funktion som   visar ToDoListan och kollar om de done eller delate
function showTodoList(todosFromLS){
todoItemsList.innerHTML = "";
state="All"; //Sätter att Alla visas

for (let i = 0; i < todosFromLS.length; i++) {
  const todoItem = document.createElement("li");
  todoItem.setAttribute("class", "item"); //class för form
  let id = todosFromLS[i].id;
  todoItem.setAttribute("data-key",id); //sätter id
  let text = todosFromLS[i].todotext;
  const btn = document.createElement("button");
  btn.setAttribute("class", "klarbtn")
  
  if (todosFromLS[i].deleted === true ) { //Har inte änvänt Delete ab en rad än men har med den ifall
  } else {
      if (todosFromLS[i].done === true) {
      todoItem.classList.add("done");
      } 
      todoItem.innerHTML = text;
      btn.innerHTML = "Klar";
    
      todoItemsList.appendChild(todoItem);
      todoItem.appendChild(btn);  

    }
 
}
}

//Funktion som   visar Aktiva listan om trycker på den knappen
function showActiveList(todosFromLS){
  todoItemsList.innerHTML = "";
  state="Active";

  for (let i = 0; i < todosFromLS.length; i++) {
    const todoItem = document.createElement("li");
    todoItem.setAttribute("class", "item"); //class för form
    let id = todosFromLS[i].id;
    todoItem.setAttribute("data-key",id); //sätter id
    let text = todosFromLS[i].todotext;
    const btn = document.createElement("button");
    btn.setAttribute("class", "klarbtn")

    if (todosFromLS[i].deleted === true ) { //Vet ej än om jag ska använda deleted
    } else {
        if (todosFromLS[i].done === false) {
        todoItem.innerHTML = text;
        btn.innerHTML = "Klar";
        todoItemsList.appendChild(todoItem);
        todoItem.appendChild(btn);
      }  
      }
   
  }
  }

//Funktion som  visar Klara listan om trycker på den knappen
function showDoneList(todosFromLS){
  todoItemsList.innerHTML = "";
  state="Done";

  for (let i = 0; i < todosFromLS.length; i++) {
    const todoItem = document.createElement("li");
    todoItem.setAttribute("class", "item"); //class för form
    let id = todosFromLS[i].id;
    todoItem.setAttribute("data-key",id); //sätter id
    let text = todosFromLS[i].todotext;
    const btn = document.createElement("button");
    btn.setAttribute("class", "klarbtn")
    
    if (todosFromLS[i].deleted === true ) { //Vet ej än om jag ska använda deleted
    } else {
        if (todosFromLS[i].done === true) {
        todoItem.classList.add("done");
        todoItem.innerHTML = text;
        btn.innerHTML = "Klar";
        todoItemsList.appendChild(todoItem);
        todoItem.appendChild(btn);
      }  
      }
  }
  }

//Lyssnar på knappen för ny ToDo
todoForm.addEventListener("submit", function(e){
  e.preventDefault();
  newToDo(todoInput.value);
  //alert("ny knapp");
})

//Funktion lägga till ny
function newToDo(newTodoText) {
  //alert("ny");
  if(newTodoText===""){
    alert("Du har inte angivet någon ny Att göra!");
  }
  else{
  let newTodo = new ToDo (Date.now(), newTodoText, false, false);
  todos.push (newTodo); //Lägger till den nya
  
  //läser in nya i LS
  storeToLS(todos);
 
  //hämtar igen och visar
  getFromLS();

  //rensar input
  todoInput.value=""; 
  }  
}

function addTestData(todos) { //lägger till testdata. De fick samma nyckel så fick addera nedan.
  let newTodo1 = new ToDo (Date.now(),"Tömma diskmaskinen", false, false);
  todos.push (newTodo1);
  let newTodo2 = new ToDo (Date.now()+1,"Borsta tänder", true, false);
  todos.push (newTodo2);
  let newTodo3 = new ToDo (Date.now()+2,"Göra läxan", false, false);
  todos.push (newTodo3);
  let newTodo4 = new ToDo (Date.now()+3,"Deleted", true, true);
  todos.push (newTodo4);

  //läser in nya i LS
  storeToLS(todos);
 
  //hämtar igen och visar
  getFromLS();
}

  
//Toggla när klickar på knappen och skickar parent som är listan item
todoItemsList.addEventListener("click", function(ev) {
    toggle(ev.target.parentElement.getAttribute('data-key'));
  }
)

  //Toggle och spara ner ändring om Klar eller ej
  function toggle(id) {
    todos.forEach(function(item) {
      if (item.id == id) {
        // toggle the value
        item.done = !item.done;
      }
    });
  storeToLS(todos);
  getFromLS()
  }

//Knappen Visar hela listan 
showAll.addEventListener('click', function(){
  showTodoList(todos);
  //alert("All");
  showAll.setAttribute("class", "markedbtn");
  showActive.setAttribute("class", "btn");
  showDone.setAttribute("class", "btn");
}
)

//Visar Aktiva
showActive.addEventListener('click', function(){
  showActiveList(todos); //visar aktiva
  //alert("Aktiva");
  showAll.setAttribute("class", "btn");
  showActive.setAttribute("class", "markedbtn");
  showDone.setAttribute("class", "btn");
}
)

//Visar Klara
showDone.addEventListener('click', function(){
  showDoneList(todos); //visar klara
  //alert("Klara");
  showAll.setAttribute("class", "btn");
  showActive.setAttribute("class", "btn");
  showDone.setAttribute("class", "markedbtn");
}
)

//Känner av knappen rensa hela listan i local storage
deleteAll.addEventListener('click', function(){
  deleteAllList();
}
)

//Adderar testdata
addData.addEventListener('click', function(){
  addTestData(todos);
  //alert("Testdata");
}
)

// Funktion rensa hela listan men frågar först
function deleteAllList() {
  let text="Är du säker på att du vill rensa hela Att göra listan?";
  if (confirm(text)==true) {
  //alert("Delete");
  localStorage.clear();
  todoItemsList.innerHTML = "";
  getFromLS();
  todos=[]
  }
}




