import React from 'react';
import { ChakraProvider, Checkbox, StatLabel } from '@chakra-ui/react'

function TaskList({ tasks, toggleTaskCompletion, deleteTask }) {
  return (
    <div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(index)}
            />
            <span>{task.text}</span>
            <button className="delete" onClick={() => deleteTask(index)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
