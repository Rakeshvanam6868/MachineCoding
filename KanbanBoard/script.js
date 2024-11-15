// Create an empty tasks object for each column
let tasks = {
    'to-do': [],
    'in-progress': [],
    'done': []
  };
  
  // Function to add a task
  function addTask(column) {
    const taskTitle = prompt('Enter the task title:');
    if (!taskTitle) return;
  
    const taskId = Date.now();
    const task = {
      id: taskId,
      title: taskTitle,
      subtasks: []
    };
  
    tasks[column].push(task);
    renderColumn(column);
  }
  
  // Function to render a column
  function renderColumn(column) {
    const taskList = document.getElementById(`${column}-tasks`);
    taskList.innerHTML = ''; // Clear the existing tasks
  
    tasks[column].forEach(task => {
      const taskDiv = document.createElement('div');
      taskDiv.classList.add('task');
      taskDiv.innerHTML = `
        <strong>${task.title}</strong>
        <button onclick="addSubtask(${task.id}, '${column}')">Add Subtask</button>
        <ul id="subtasks-${task.id}"></ul>
        <button onclick="moveTask(${task.id}, '${column}')">Move to ${getNextColumn(column)}</button>
      `;
      taskList.appendChild(taskDiv);
      
      // Render subtasks
      renderSubtasks(task);
    });
  }
  
  // Function to add a subtask
  function addSubtask(taskId, column) {
    const subtaskTitle = prompt('Enter the subtask title:');
    if (!subtaskTitle) return;
  
    const task = tasks[column].find(task => task.id === taskId);
    if (task) {
      const subtaskId = Date.now();
      task.subtasks.push({ id: subtaskId, title: subtaskTitle });
      renderColumn(column); // Re-render the column to show new subtask
    }
  }
  
  // Function to render subtasks
  function renderSubtasks(task) {
    const subtaskList = document.getElementById(`subtasks-${task.id}`);
    subtaskList.innerHTML = ''; // Clear existing subtasks
  
    task.subtasks.forEach(subtask => {
      const subtaskLi = document.createElement('li');
      subtaskLi.textContent = subtask.title;
      subtaskList.appendChild(subtaskLi);
    });
  }
  
  // Function to move a task to the next column
  function moveTask(taskId, column) {
    const nextColumn = getNextColumn(column);
    const taskIndex = tasks[column].findIndex(task => task.id === taskId);
  
    if (taskIndex === -1) return;
  
    // Move task to the next column
    const task = tasks[column].splice(taskIndex, 1)[0];
    tasks[nextColumn].push(task);
    
    renderColumn(column);
    renderColumn(nextColumn);
  }
  
  // Function to get the next column name
  function getNextColumn(currentColumn) {
    switch (currentColumn) {
      case 'to-do': return 'in-progress';
      case 'in-progress': return 'done';
      case 'done': return 'to-do';
      default: return 'to-do';
    }
  }
  
  // Initial render of all columns
  renderColumn('to-do');
  renderColumn('in-progress');
  renderColumn('done');
  