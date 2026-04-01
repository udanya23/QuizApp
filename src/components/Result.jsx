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
                        <div className="human-card p-4 p-md-5 text-center fade-in">
                            
                            <div className="mb-5">
                                <div className="display-1 mb-4">{praise.emoji}</div>
                                <h1 className="display-4 mb-2">{praise.phrase}</h1>
                                <p className="text-muted fs-5 px-4">{praise.msg}</p>
                            </div>

                            <div className="position-relative d-inline-block mb-5">
                                <h1 className="display-2 fw-black text-gradient mb-0" style={{ fontSize: '5rem' }}>
                                    {percentage}%
                                </h1>
                                <div className="text-muted fw-bold small mt-minus-1">ACCURACY SCORE</div>
                            </div>

                            <div className="d-flex justify-content-center gap-3 mb-5">
                                <div className="pill-option py-3 px-4 border-light bg-light bg-opacity-50">
                                    <div className="small text-muted mb-1">CORRECT</div>
                                    <div className="h4 fw-black mb-0 text-success">{score}</div>
                                </div>
                                <div className="pill-option py-3 px-4 border-light bg-light bg-opacity-50">
                                    <div className="small text-muted mb-1">TOTAL</div>
                                    <div className="h4 fw-black mb-0 text-primary">{total}</div>
                                </div>
                            </div>

                            <div className="d-grid gap-3 pt-5 border-top border-light">
                                <button
                                    className="btn-human justify-content-center py-3"
                                    onClick={() => navigate("/quiz" + location.search)}
                                >
                                    <i className="bi bi-arrow-clockwise"></i> Play Again
                                </button>

                                <button
                                    className="btn-human-secondary py-3 rounded-pill fw-bold"
                                    onClick={() => navigate("/")}
                                >
                                    <i className="bi bi-house"></i> Home
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
