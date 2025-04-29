import { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = ({ token }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(`https://feedback-api-w3kg.onrender.com/feedback?page=${currentPage}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFeedbacks(response.data.feedbacks);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Erro ao carregar feedbacks:', error);
      }
    };
    fetchFeedbacks();
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
      <h2>Feedbacks</h2>
      <div className="feedback-list">
        {feedbacks.length > 0 ? (
          feedbacks.map((feedback, index) => (
            <div key={index} className="feedback-card">
              <h3>{feedback.name}</h3>
              <p><strong>Nota:</strong> {feedback.note}</p>
              <p><strong>Comentário:</strong> {feedback.comment}</p>
            </div>
          ))
        ) : (
          <p>Não há feedbacks para exibir.</p>
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

export default Dashboard;
