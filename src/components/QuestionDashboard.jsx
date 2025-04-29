import { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const QuestionDashboard = ({ token }) => {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`https://feedback-api-w3kg.onrender.com/questions?page=${currentPage}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setQuestions(response.data.questions);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Erro ao carregar dúvidas:', error);
      }
    };
    fetchQuestions();
  }, [currentPage, token]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Dúvidas</h2>
      <div className="feedback-list">
        {questions.length > 0 ? (
          questions.map((q, index) => (
            <div key={index} className="feedback-card">
              <h3>{q.name || "Anônimo"}</h3>
              <p><strong>Dúvida:</strong> {q.question}</p>
            </div>
          ))
        ) : (
          <p>Não há dúvidas para exibir.</p>
        )}
      </div>

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Anterior
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Próxima
        </button>
      </div>
    </div>
  );
};

export default QuestionDashboard;
