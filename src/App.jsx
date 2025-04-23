import { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import FeedbackForm from './components/FeedbackForm';
import './App.css';

const App = () => {
  const [token, setToken] = useState(null);
  const [page, setPage] = useState('form');

  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('authToken', token);
    setToken(token);
    setPage('form');
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    setPage('login');
  };

  if (!token) return <Login onLogin={handleLogin} />;

  return (
    <div className="app">
      <nav>
        <button onClick={() => setPage('form')}>Enviar Feedback</button>
        <button onClick={() => setPage('dashboard')}>Ver Feedbacks</button>
        <button onClick={handleLogout}>Sair</button>
      </nav>
      {page === 'form' ? <FeedbackForm /> : <Dashboard token={token} />}
    </div>
  );
};

export default App;
