import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const navigate = useNavigate();

  useEffect(function () {
    fetch("https://opentdb.com/api_category.php")
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        setCategories(data.trivia_categories);
      });
  }, []);

  
  function startQuiz() {
    if (!category || !difficulty) {
      alert("Please select category and difficulty");
      return;
    }

    navigate(`/quiz?category=${category}&difficulty=${difficulty}`);
  }

  return (
    <div className="min-vh-100 bg-light py-4">
      <div className="container">

        <div className="text-center mb-4">
          <h3 className="fw-bold">Quiz Application</h3>
          <p className="text-muted">Choose a category and start playing </p>
        </div>

        <div className="row g-3 mb-4">
          {categories.map(function (cat) {
            return (
              <div key={cat.id} className="col-6 col-md-4 col-lg-3">
                <div
                  className={`card h-100 text-center p-3 border-0 shadow-sm rounded-4 
                    ${category === cat.id ? "bg-primary text-white" : ""}`}
                  style={{ cursor: "pointer" }}
                  onClick={function () {
                    setCategory(cat.id);
                  }}
                >
                  <h6 className="fw-semibold mb-0">{cat.name}</h6>
                </div>
              </div>
            );
          })}
        </div>

        <div className="row justify-content-center mb-4">
          <div className="col-12 col-sm-8 col-md-6">
            <label className="form-label fw-semibold">
              Select Difficulty
            </label>
            <select
              className="form-select"
              value={difficulty}
              onChange={function (e) {
                setDifficulty(e.target.value);
              }}
            >
              <option value="">-- Choose Difficulty --</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-12 col-sm-8 col-md-6">
            <button
              className="btn btn-success w-100 py-2 fw-semibold"
              onClick={startQuiz}
            >
              Start Quiz 
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;
