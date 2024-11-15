let tasks = [];
let editTaskId = null;

// Function to add a new task
function addTask() {
  const taskInput = document.getElementById("new-task-input");
  const taskText = taskInput.value.trim();
  
  if (taskText === "") return;

  tasks.push({ id: Date.now(), text: taskText });
  taskInput.value = "";
  renderTasks();
}

// Function to render tasks on the screen
function renderTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = ""; // Clear the list before rendering
  
  tasks.forEach((task) => {
    const listItem = document.createElement("li");
    listItem.className = "task-item";
    
    const span = document.createElement("span");
    span.innerText = task.text;
    
    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.onclick = () => editTask(task.id);
    
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.onclick = () => deleteTask(task.id);
    
    listItem.appendChild(span);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    
    taskList.appendChild(listItem);
  });
}

// Function to delete a task
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
}

// Function to enable editing of a task
function editTask(id) {
  const taskToEdit = tasks.find((task) => task.id === id);
  document.getElementById("edit-task-input").value = taskToEdit.text;
  editTaskId = id;
  document.getElementById("edit-task-section").style.display = "block";
}

// Function to update an existing task
function updateTask() {
  const updatedText = document.getElementById("edit-task-input").value.trim();
  
  if (updatedText === "") return;
  
  tasks = tasks.map((task) =>
    task.id === editTaskId ? { ...task, text: updatedText } : task
  );
  editTaskId = null;
  document.getElementById("edit-task-section").style.display = "none";
  renderTasks();
}

// Function to cancel editing
function cancelEdit() {
  editTaskId = null;
  document.getElementById("edit-task-section").style.display = "none";
}
