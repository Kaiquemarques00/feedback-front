import { useState, useEffect } from "react";
import FeedbackForm from "./components/FeedbackForm";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import QuestionForm from "./components/QuestionsForm";
import QuestionDashboard from "./components/QuestionDashboard";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [view, setView] = useState("form");

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  return (
    <div className="app-container">
      <nav>
        <button onClick={() => setView("form")}>Enviar Feedback</button>
        <button onClick={() => setView("question")}>Enviar Dúvida</button>
        <button onClick={() => setView("dashboard")}>
          Visualizar Feedbacks
        </button>
        <button onClick={() => setView("questions")}>Visualizar Dúvidas</button>
        {token && <button onClick={() => setToken(null)}>Sair</button>}
      </nav>

      {view === "form" && <FeedbackForm />}
      {view === "question" && <QuestionForm />}
      {view === "dashboard" &&
        (token ? (
          <Dashboard token={token} />
        ) : (
          <Login onLogin={setToken} onNavigate={() => setView("dashboard")} />
        ))}
      {view === "questions" &&
        (token ? (
          <QuestionDashboard token={token} />
        ) : (
          <Login onLogin={setToken} onNavigate={() => setView("questions")} />
        ))}
    </div>
  );
}

export default App;
