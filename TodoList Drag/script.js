const todoList = document.getElementById('todo-list');
let draggedItem = null;

// Add event listeners to all items
todoList.addEventListener('dragstart', (e) => {
  if (e.target.classList.contains('todo-item')) {
    draggedItem = e.target;
    e.target.classList.add('dragging');
  }
});

todoList.addEventListener('dragend', (e) => {
  if (e.target.classList.contains('todo-item')) {
    e.target.classList.remove('dragging');
    draggedItem = null;
  }
});

// Handle drag over event
todoList.addEventListener('dragover', (e) => {
  e.preventDefault();
  const afterElement = getDragAfterElement(todoList, e.clientY);
  if (afterElement == null) {
    todoList.appendChild(draggedItem);
  } else {
    todoList.insertBefore(draggedItem, afterElement);
  }
});

// Get the element after which the dragged item will be placed
function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll('.todo-item:not(.dragging)')
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
