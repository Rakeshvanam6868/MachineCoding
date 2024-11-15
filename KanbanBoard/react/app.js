import React, { useState } from "react";
import "./App.css";

// Kanban board component
const App = () => {
  const [tasks, setTasks] = useState({
    "to-do": [],
    "in-progress": [],
    "done": [],
  });

  // Function to add a task
  const addTask = (column) => {
    const taskTitle = prompt("Enter the task title:");
    if (!taskTitle) return;

    const taskId = Date.now();
    const newTask = {
      id: taskId,
      title: taskTitle,
      subtasks: [],
    };

    setTasks((prevState) => {
      const updatedTasks = { ...prevState };
      updatedTasks[column].push(newTask);
      return updatedTasks;
    });
  };

  // Function to add a subtask
  const addSubtask = (taskId, column) => {
    const subtaskTitle = prompt("Enter the subtask title:");
    if (!subtaskTitle) return;

    const updatedTasks = { ...tasks };
    const task = updatedTasks[column].find((task) => task.id === taskId);
    if (task) {
      const subtaskId = Date.now();
      task.subtasks.push({ id: subtaskId, title: subtaskTitle });
      setTasks(updatedTasks);
    }
  };

  // Function to move task to the next column
  const moveTask = (taskId, column) => {
    const columnOrder = ["to-do", "in-progress", "done"];
    const nextColumn = columnOrder[(columnOrder.indexOf(column) + 1) % 3];

    const updatedTasks = { ...tasks };
    const taskIndex = updatedTasks[column].findIndex((task) => task.id === taskId);
    if (taskIndex === -1) return;

    const task = updatedTasks[column].splice(taskIndex, 1)[0];
    updatedTasks[nextColumn].push(task);
    setTasks(updatedTasks);
  };

  // Function to render tasks for each column
  const renderColumn = (column) => {
    return (
      <div className="kanban-column">
        <h3>{capitalizeFirstLetter(column)}</h3>
        <div className="task-list">
          {tasks[column].map((task) => (
            <div key={task.id} className="task">
              <strong>{task.title}</strong>
              <button onClick={() => addSubtask(task.id, column)}>Add Subtask</button>
              <ul>
                {task.subtasks.map((subtask) => (
                  <li key={subtask.id}>{subtask.title}</li>
                ))}
              </ul>
              <button onClick={() => moveTask(task.id, column)}>
                Move to {getNextColumn(column)}
              </button>
            </div>
          ))}
        </div>
        <button onClick={() => addTask(column)}>Add Task</button>
      </div>
    );
  };

  const getNextColumn = (currentColumn) => {
    switch (currentColumn) {
      case "to-do":
        return "In Progress";
      case "in-progress":
        return "Done";
      case "done":
        return "To Do";
      default:
        return "To Do";
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="kanban-board">
      {["to-do", "in-progress", "done"].map((column) => renderColumn(column))}
    </div>
  );
};

export default App;
