import { useNavigate, useLocation } from "react-router-dom";

function Result() {
    const navigate = useNavigate();
    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const score = Number(params.get("score"));
    const total = Number(params.get("total"));

    const percentage = Math.round((score / total) * 100);

    const getPraise = (pct) => {
        if (pct === 100) return { emoji: "✨", phrase: "Absolute Perfection", msg: "You've mastered every detail of this challenge." };
        if (pct >= 80) return { emoji: "🌟", phrase: "Outstanding Work", msg: "A truly impressive performance. Well done!" };
        if (pct >= 50) return { emoji: "🌿", phrase: "Great Progress", msg: "You have a solid foundation. Keep growing!" };
        return { emoji: "🌱", phrase: "Keep Learning", msg: "Every expert was once a beginner. Try once more?" };
    };

    const praise = getPraise(percentage);

    return (
        <div className="min-vh-100 py-5 d-flex align-items-center">
            <div className="animated-bg">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>
            </div>
            
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">
                        <div className="human-card p-4 text-center fade-in" style={{ maxWidth: '600px' }}>
                            <div className="mb-4">
                                <div className="display-4 mb-2">{praise.emoji}</div>
                                <h2 className="mb-1">{praise.phrase}</h2>
                                <p className="text-muted small px-3">{praise.msg}</p>
                            </div>

                            <div className="mb-4">
                                <h1 className="display-3 fw-bold text-gradient mb-0">
                                    {percentage}%
                                </h1>
                                <div className="text-muted small fw-bold">ACCURACY</div>
                            </div>

                            <div className="d-flex justify-content-center gap-2 mb-4">
                                <div className="pill-option py-2 px-3 border-light bg-light bg-opacity-30">
                                    <div className="small text-muted">Correct</div>
                                    <div className="fw-bold text-success">{score}</div>
                                </div>
                                <div className="pill-option py-2 px-3 border-light bg-light bg-opacity-30">
                                    <div className="small text-muted">Total</div>
                                    <div className="fw-bold text-primary">{total}</div>
                                </div>
                            </div>

                            <div className="d-grid gap-2 pt-4 border-top border-light">
                                <button
                                    className="btn-human justify-content-center py-2"
                                    onClick={() => navigate("/quiz" + location.search)}
                                >
                                    <i className="bi bi-arrow-clockwise"></i> Play Again
                                </button>

                                <button
                                    className="btn-human-secondary py-2 rounded-pill fw-bold small"
                                    onClick={() => navigate("/")}
                                >
                                    Home
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
