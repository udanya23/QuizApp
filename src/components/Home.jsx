import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CATEGORY_ICONS = {
    science: "bi-cpu",
    history: "bi-hourglass-split",
    geography: "bi-globe2",
    sport: "bi-trophy",
    art: "bi-palette",
    music: "bi-music-note-beamed",
    film: "bi-camera-video",
    book: "bi-book",
    computer: "bi-laptop",
    math: "bi-calculator",
    animal: "bi-tree",
    food: "bi-cup-hot",
    mythology: "bi-stars",
    game: "bi-controller",
    politics: "bi-bank",
    celeb: "bi-person-star",
    general: "bi-grid"
};

function getCategoryIcon(name) {
    const n = name.toLowerCase();
    for (const [key, icon] of Object.entries(CATEGORY_ICONS)) {
        if (n.includes(key)) return icon;
    }
    return "bi-question-circle";
}

function Home() {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("medium");
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://opentdb.com/api_category.php")
            .then((res) => res.json())
            .then((data) => {
                setCategories(data.trivia_categories.slice(0, 12));
            });
    }, []);

    function startQuiz() {
        if (!category) {
            alert("Choose a theme to begin");
            return;
        }
        navigate(`/quiz?category=${category}&difficulty=${difficulty}`);
    }

    const difficulties = [
        { value: "easy", label: "Easy" },
        { value: "medium", label: "Medium" },
        { value: "hard", label: "Hard" },
    ];

    return (
        <div className="min-vh-100 d-flex align-items-center py-5">
            <div className="animated-bg">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>
            </div>
            
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="human-card p-4 p-md-5 fade-in">
                            <div className="text-center mb-5">
                                <h1 className="display-4 mb-2">
                                    Ready for a <span className="text-gradient">Challenge?</span>
                                </h1>
                                <p className="text-muted fs-5">Pick your topic and let's go.</p>
                            </div>

                            <div className="mb-5">
                                <div className="row g-4">
                                    {categories.length > 0 ? (
                                        categories.map((cat) => (
                                            <div key={cat.id} className="col-6 col-sm-4 col-md-3">
                                                <div
                                                    className={`cat-item h-100 ${category === cat.id ? "selected" : ""}`}
                                                    onClick={() => setCategory(cat.id)}
                                                >
                                                    <i className={`bi ${getCategoryIcon(cat.name)} cat-icon-large`}></i>
                                                    <span className="fw-bold small">{cat.name.split(":")[cat.name.split(":").length - 1].trim()}</span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center w-100 py-5">
                                            <div className="spinner-grow text-primary opacity-25"></div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-4 mt-5 pt-4 border-top border-light">
                                <div className="d-flex gap-2">
                                    {difficulties.map((diff) => (
                                        <div
                                            key={diff.value}
                                            className={`pill-option ${difficulty === diff.value ? "active" : ""}`}
                                            onClick={() => setDifficulty(diff.value)}
                                        >
                                            {diff.label}
                                        </div>
                                    ))}
                                </div>

                                <button
                                    className="btn-human px-5"
                                    onClick={startQuiz}
                                >
                                    Start Now <i className="bi bi-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
