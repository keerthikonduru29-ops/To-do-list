let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

document.getElementById("addBtn").addEventListener("click", addTask);

function addTask() {
    if(taskInput.value.trim() === "") return;

    tasks.push({
        text: taskInput.value,
        completed: false
    });

    taskInput.value = "";
    saveTasks();
    displayTasks(tasks);
}

function displayTasks(taskArray) {
    taskList.innerHTML = "";

    taskArray.forEach((task,index) => {

        let li = document.createElement("li");

        li.innerHTML = `
        <span onclick="toggleTask(${index})"
        style="text-decoration:${task.completed ? 'line-through':'none'}">
        ${task.text}
        </span>

        <div>
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
        </div>
        `;

        taskList.appendChild(li);
    });
}

function toggleTask(index){
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    displayTasks(tasks);
}

function deleteTask(index){
    tasks.splice(index,1);
    saveTasks();
    displayTasks(tasks);
}

function editTask(index){
    let newTask = prompt("Edit Task", tasks[index].text);

    if(newTask){
        tasks[index].text = newTask;
        saveTasks();
        displayTasks(tasks);
    }
}

function filterTasks(type){

    if(type === "all"){
        displayTasks(tasks);
    }

    if(type === "active"){
        displayTasks(tasks.filter(task => !task.completed));
    }

    if(type === "completed"){
        displayTasks(tasks.filter(task => task.completed));
    }
}

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

displayTasks(tasks);
