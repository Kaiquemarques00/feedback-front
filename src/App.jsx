import { useState, useEffect } from "react";
import FeedbackForm from "./components/FeedbackForm";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import QuestionForm from "./components/QuestionForm";

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
        <button onClick={() => setView("dashboard")}>Visualizar Feedbacks</button>
        {token && <button onClick={() => setToken(null)}>Sair</button>}
      </nav>

      {view === "form" && <FeedbackForm />}
      {view === "question" && <QuestionForm />}
      {view === "dashboard" && (
        token ? (
          <Dashboard token={token} />
        ) : (
          <Login setToken={setToken} />
        )
      )}
    </div>
  );
}

export default App;