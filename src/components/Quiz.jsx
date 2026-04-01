import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Quiz() {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const category = params.get("category");
  const difficulty = params.get("difficulty");

  const safeCategory = category || 9;
  const safeDifficulty = difficulty || "easy";

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [timer, setTimer] = useState(15);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://opentdb.com/api.php?amount=10&category=${safeCategory}&difficulty=${safeDifficulty}&type=multiple`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.results) setQuestions(data.results);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [location.search]);

  useEffect(() => {
    if (loading || !questions.length) return;
    if (timer === 0) {
      handleNext();
      return;
    }
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, loading, questions.length]);

  function handleAnswer(option) {
    if (selectedOption) return;
    setSelectedOption(option);
    if (option === questions[currentIndex].correct_answer) {
      setScore((prev) => prev + 1);
    }
  }

  function handleNext() {
    setSelectedOption("");
    setTimer(15);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      navigate(`/result?score=${score}&total=${questions.length}${location.search.replace('?', '&')}`);
    }
  }

  if (loading || !questions.length) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <div className="spinner-grow text-primary opacity-25"></div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const options = [
    ...currentQuestion.incorrect_answers,
    currentQuestion.correct_answer,
  ].sort();

  return (
    <div className="min-vh-100 d-flex align-items-center py-5">
      <div className="animated-bg">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-9">
            <div className="human-card p-4 p-md-5 fade-in">
              <div className="d-flex justify-content-between align-items-center mb-5">
                <span className="fw-bold text-muted small">
                  {currentIndex + 1} / {questions.length}
                </span>
                <div className={`d-flex align-items-center gap-2 px-3 py-1 rounded-pill ${timer <= 5 ? 'bg-danger text-white' : 'bg-light'}`}>
                  <i className="bi bi-clock-fill"></i>
                  <span className="fw-bold">{timer}s</span>
                </div>
              </div>

              <div className="text-center mb-5">
                <h2 
                  className="mx-auto" 
                  style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', maxWidth: '800px', lineHeight: '1.4' }}
                  dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
                />
              </div>

              <div className="row g-3 mb-5 mt-4">
                {options.map((opt, index) => (
                  <div key={index} className="col-12 col-md-6">
                    <button
                      className={`pill-option w-100 py-3 px-4 text-start d-flex align-items-center gap-3 ${
                        selectedOption === opt 
                          ? (opt === currentQuestion.correct_answer ? 'bg-success text-white border-success' : 'bg-danger text-white border-danger') 
                          : (selectedOption && opt === currentQuestion.correct_answer ? 'border-success text-success' : '')
                      }`}
                      onClick={() => handleAnswer(opt)}
                      disabled={!!selectedOption}
                      style={{ height: '100%', fontSize: '1.1rem' }}
                    >
                      <span className="opacity-50 fw-black">{String.fromCharCode(65 + index)}</span>
                      <span dangerouslySetInnerHTML={{ __html: opt }} />
                      {selectedOption && opt === currentQuestion.correct_answer && <i className="bi bi-check-lg ms-auto"></i>}
                    </button>
                  </div>
                ))}
              </div>

              <div className="text-center pt-4 border-top border-light">
                <button
                  className="btn-human"
                  onClick={handleNext}
                  disabled={!selectedOption}
                >
                  {currentIndex + 1 === questions.length ? "Finish" : "Next One"} <i className="bi bi-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
