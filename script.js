let tasks =
JSON.parse(localStorage.getItem("tasks")) || [];

let filter = "all";

const taskList =
document.getElementById("taskList");

document
.getElementById("addTask")
.addEventListener("click",addTask);

document
.getElementById("search")
.addEventListener("input",renderTasks);

document
.getElementById("sortSelect")
.addEventListener("change",renderTasks);

function addTask(){

const title =
document.getElementById("title").value;

if(!title){
alert("Enter task title");
return;
}

const task = {

id:Date.now(),

title,

description:
document.getElementById("description").value,

date:
document.getElementById("date").value,

time:
document.getElementById("time").value,

priority:
document.getElementById("priority").value,

completed:false

};

tasks.push(task);

saveTasks();

clearForm();

renderTasks();
}

function clearForm(){

title.value="";
description.value="";
date.value="";
time.value="";
}

function saveTasks(){

localStorage.setItem(
"tasks",
JSON.stringify(tasks)
);
}

function renderTasks(){

taskList.innerHTML="";

let displayTasks=[...tasks];

const search=
document
.getElementById("search")
.value
.toLowerCase();

displayTasks=
displayTasks.filter(task=>
task.title
.toLowerCase()
.includes(search)
);

if(filter==="completed")
displayTasks=
displayTasks.filter(
t=>t.completed
);

if(filter==="pending")
displayTasks=
displayTasks.filter(
t=>!t.completed
);

const sortValue=
document
.getElementById("sortSelect")
.value;

if(sortValue==="priority"){

const order={
High:1,
Medium:2,
Low:3
};

displayTasks.sort(
(a,b)=>
order[a.priority]-
order[b.priority]
);
}

displayTasks.forEach(task=>{

const div=
document.createElement("div");

let overdue=false;

if(task.date){

const due=
new Date(task.date);

const today=
new Date();

overdue=
due < today &&
!task.completed;
}

div.className=
`task
${task.priority.toLowerCase()}
${task.completed ? " completed":""}
${overdue ? " overdue":""}`;

div.innerHTML=`

<h3>${task.title}</h3>

<p>${task.description}</p>

<p>Date:
${task.date || "N/A"}</p>

<p>Time:
${task.time || "N/A"}</p>

<p>Priority:
${task.priority}</p>

<div class="actions">

<button onclick="toggleTask(${task.id})">
${task.completed ? "Undo":"Complete"}
</button>

<button onclick="editTask(${task.id})">
Edit
</button>

<button onclick="deleteTask(${task.id})">
Delete
</button>

</div>
`;

taskList.appendChild(div);

});

updateStats();
}

function toggleTask(id){

tasks=
tasks.map(task=>{

if(task.id===id){

task.completed=
!task.completed;
}

return task;
});

saveTasks();
renderTasks();
}

function deleteTask(id){

if(confirm("Delete Task?")){

tasks=
tasks.filter(
task=>task.id!==id
);

saveTasks();
renderTasks();
}
}

function editTask(id){

const task=
tasks.find(
task=>task.id===id
);

const newTitle=
prompt(
"Edit Title",
task.title
);

if(newTitle){

task.title=newTitle;

saveTasks();

renderTasks();
}
}

function updateStats(){

const total=
tasks.length;

const completed=
tasks.filter(
t=>t.completed
).length;

document.getElementById(
"total"
).textContent=total;

document.getElementById(
"completed"
).textContent=completed;

document.getElementById(
"pending"
).textContent=
total-completed;
}

function setFilter(value){

filter=value;

renderTasks();
}

document
.getElementById("themeBtn")
.addEventListener(
"click",
()=>{
document.body
.classList.toggle("dark");
}
);

renderTasks();