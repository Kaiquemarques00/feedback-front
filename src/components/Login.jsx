import { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = ({ onLogin, onNavigate }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/auth/login', { username, password });
      onLogin(res.data.token);
      onNavigate();
    } catch {
      setError('Usuário ou senha inválidos');
    }
  };

  return (
    <div className="login-container">
      <h2>Login do Administrador</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Usuário" value={username} onChange={e => setUsername(e.target.value)} required />
        <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Entrar</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;