import { useNavigate, useLocation } from "react-router-dom";

function Result() {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const score = Number(params.get("score"));
  const total = Number(params.get("total"));

  const wrong = total - score;
  const percentage = Math.round((score / total) * 100);

  return (
    <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6">

            <div className="card shadow-lg border-0 rounded-4 p-4 text-center">

              <h3 className="fw-bold mb-3">Quiz Completed</h3>

              <div className="mb-3">
                <h1 className="fw-bold text-success">{percentage}%</h1>
                <p className="text-muted mb-0">Your Score</p>
              </div>

              <div className="row mb-4">
                <div className="col-6">
                  <div className="border rounded-3 p-3">
                    <h5 className="text-success fw-bold mb-0">{score}</h5>
                    <small className="text-muted">Correct</small>
                  </div>
                </div>

                <div className="col-6">
                  <div className="border rounded-3 p-3">
                    <h5 className="text-danger fw-bold mb-0">{wrong}</h5>
                    <small className="text-muted">Wrong</small>
                  </div>
                </div>
              </div>

              <div className="d-grid gap-3">
                <button
                  className="btn btn-success py-2"
                  onClick={function () {
                    navigate("/quiz" + location.search);
                  }}
                >
                  Retry Quiz 
                </button>


                <button
                  className="btn btn-outline-primary py-2"
                  onClick={function () {
                    navigate("/");
                  }}
                >
                  Back to Home
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Result;
