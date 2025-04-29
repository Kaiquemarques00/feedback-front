import { useState } from 'react';
import axios from 'axios';
import './FeedbackForm.css';

const FeedbackForm = () => {
  const [form, setForm] = useState({ name: '', email: '', note: 1, comment: '' });
  const [msg, setMsg] = useState({ text: '', type: '' });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === 'note' ? parseInt(value) : value // Converte a nota para inteiro
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('https://feedback-api-w3kg.onrender.com/feedback', form);
      setMsg({ text: 'Feedback enviado com sucesso!', type: 'success' });
      setForm({ name: '', note: 1, comment: '' });
    } catch {
      setMsg({ text: 'Erro ao enviar feedback.', type: 'error' });
    }
  };

  return (
    <div className="form-container">
      <h2>Envie seu Feedback</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Nome"
          value={form.name}
          onChange={handleChange}
          required
        />
        <select
          name="note"
          value={form.note} // Garantir que a nota seja um número inteiro
          onChange={handleChange}
        >
          {[1, 2, 3, 4, 5].map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
        <textarea
          name="comment"
          placeholder="Comentário"
          value={form.comment}
          onChange={handleChange}
          required
        />
        <button type="submit">Enviar</button>
      </form>
      {msg.text && <p className={`msg ${msg.type}`}>{msg.text}</p>}
    </div>
  );
};

export default FeedbackForm;
