// TodoList.js
import React, { useState } from 'react';
import './TodoList.css'; // Stelle sicher, dass die CSS-Datei importiert ist

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-list">
      <h2>Meine TODO-Liste</h2>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Neue Aufgabe"
      />
      <button className="myButton" onClick={addTask}>Hinzufügen</button> {/* Hier ist der Klassenname */}
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button className="myButton" onClick={() => deleteTask(index)}>Löschen</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
