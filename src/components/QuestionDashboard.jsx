// src/components/QuestionDashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

const QuestionDashboard = ({ token }) => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get("https://feedback-api-w3kg.onrender.com/questions", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuestions(res.data);
      } catch (err) {
        setError("Erro ao carregar dúvidas");
        console.error(err);
      }
    };

    fetchQuestions();
  }, [token]);

  return (
    <div className="dashboard">
      <h2>Lista de Dúvidas</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {questions.map((q) => (
          <li key={q.id} className="feedback-item">
            <p><strong>Nome:</strong> {q.name || "Anônimo"}</p>
            <p><strong>Dúvida:</strong> {q.question}</p>
            <p className="timestamp">{new Date(q.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionDashboard;