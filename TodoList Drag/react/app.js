import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([
    { id: "1", content: "Buy groceries" },
    { id: "2", content: "Clean the house" },
    { id: "3", content: "Finish React project" },
    { id: "4", content: "Call Mom" },
  ]);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedTasks = Array.from(tasks);
    const [movedItem] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedItem);

    setTasks(reorderedTasks);
  };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <ul
              className="tasks"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {tasks.map(({ id, content }, index) => (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="task"
                    >
                      {content}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default App;
