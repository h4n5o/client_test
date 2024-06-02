import React, { useState, useEffect } from 'react';
import './App.css';
import './components/TodoList/TodoList.css';

import TodoList from './components/TodoList/TodoList'; // Importiere deine TodoList-Komponente

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getUser(token);
    }
  }, []);

  const login = async () => {
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (response.ok) {
      const { token } = await response.json();
      localStorage.setItem('token', token);
      getUser(token);
    } else {
      alert('Fehler beim Anmelden');
    }
  };

  const register = async () => {
    const response = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (response.ok) {
      const { message } = await response.json();
      alert(message);
    } else {
      alert('Fehler bei der Registrierung');
    }
  };

  const getUser = async (token) => {
    const response = await fetch('http://localhost:5000/user', {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (response.ok) {
      const { message } = await response.json();
      setUser(message);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        {user ? (
          <>
            <p>{user}</p>
            <button className="myButton" onClick={logout}>Abmelden</button>
            <TodoList /> {/* Render die TodoList-Komponente */}
          </>
        ) : (
          <>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="E-Mail" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Passwort" />
            <button className="myButton" onClick={login}>Anmelden</button>
            <button className="myButton" onClick={register}>Registrieren</button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
