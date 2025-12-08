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
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setLoading(true);
    setQuestions([]);
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption("");
    setTimer(15);

    fetch(
      `https://opentdb.com/api.php?amount=10&category=${safeCategory}&difficulty=${safeDifficulty}&type=multiple`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.results || data.results.length === 0) {
          console.log("No questions returned from API");
          setLoading(false);
          return;
        }

        setQuestions(data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, [location.search]);

  useEffect(() => {
    if (loading) return;

    if (timer === 0) {
      handleNext();
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, loading]);

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
      navigate(`/result?score=${score}&total=${questions.length}`);
    }
  }

  if (loading || !questions.length) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const options = [
    ...currentQuestion.incorrect_answers,
    currentQuestion.correct_answer,
  ].sort();

  return (
    <div
      className={`min-vh-100 d-flex align-items-center ${
        darkMode ? "dark-mode" : "bg-light"
      }`}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6">
            <div
              className={`card shadow-lg border-0 rounded-4 p-4 fade-slide ${
                darkMode ? "dark-card" : ""
              }`}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="fw-semibold">
                  Question {currentIndex + 1} / {questions.length}
                </span>

                <div className="d-flex align-items-center gap-2">
                  <span className="badge bg-danger fs-6">{timer}s</span>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => setDarkMode(!darkMode)}
                  >
                    {darkMode ? " Light" : " Dark"}
                  </button>
                </div>
              </div>

              <h5
                className="fw-bold mb-4"
                dangerouslySetInnerHTML={{
                  __html: currentQuestion.question,
                }}
              />

              <div className="d-grid gap-3 mb-4">
                {options.map((opt, index) => {
                  let btnClass = "btn btn-outline-primary";

                  if (selectedOption) {
                    if (opt === currentQuestion.correct_answer) {
                      btnClass = "btn btn-success";
                    } else if (opt === selectedOption) {
                      btnClass = "btn btn-danger";
                    } else {
                      btnClass = "btn btn-outline-secondary";
                    }
                  }

                  return (
                    <button
                      key={index}
                      className={`${btnClass} ${
                        darkMode ? "dark-btn" : ""
                      }`}
                      onClick={() => handleAnswer(opt)}
                      disabled={selectedOption !== ""}
                      dangerouslySetInnerHTML={{ __html: opt }}
                    />
                  );
                })}
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <span className="fw-semibold">Score: {score}</span>

                <button
                  className="btn btn-primary px-4"
                  onClick={handleNext}
                  disabled={!selectedOption}
                >
                  {currentIndex + 1 === questions.length ? "Finish" : "Next"}
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
