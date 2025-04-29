import { useState } from "react";
import axios from "axios";
import "./QuestionForm.css";

const QuestionForm = () => {
  const [form, setForm] = useState({ name: "", question: "" });
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/questions", form);
      setMsg("Dúvida enviada com sucesso!");
      setSuccess(true);
      setForm({ name: "", question: "" });
    } catch {
      setMsg("Erro ao enviar dúvida.");
      setSuccess(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Envie sua Dúvida</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Seu nome" value={form.name} onChange={handleChange} required />
        <textarea name="question" placeholder="Digite sua dúvida" value={form.question} onChange={handleChange} required />
        <button type="submit">Enviar</button>
      </form>
      {msg && <p className={`msg ${success ? "success" : "error"}`}>{msg}</p>}
    </div>
  );
};

export default QuestionForm;