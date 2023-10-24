import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import TaskList from './Components/TaskList/TaskList';
import './App.css'

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem('tasks')) || []
  );
  const [page, setPage] = useState('ativos');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <div className="main">
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/ativos">Tarefas Ativas</Link>
            </li>
            <li>
              <Link to="/concluidas">Tarefas Concluídas</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/ativos" element={<TaskList tasks={tasks.filter((task) => !task.completed)} toggleTaskCompletion={toggleTaskCompletion} deleteTask={deleteTask} />} />
          <Route path="/concluidas" element={<TaskList tasks={tasks.filter((task) => task.completed)} toggleTaskCompletion={toggleTaskCompletion} deleteTask={deleteTask} />} />
        </Routes>
      </Router>

      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const taskText = e.target.taskText.value;
            if (taskText) {
              addTask({ text: taskText, completed: false });
              e.target.taskText.value = '';
            }
          }}
        >
          <input type="text" name="taskText" placeholder="Nova tarefa" />
          <button type="submit">Adicionar Tarefa</button>
        </form>
      </div>
    </div>
  );
}

export default App;
