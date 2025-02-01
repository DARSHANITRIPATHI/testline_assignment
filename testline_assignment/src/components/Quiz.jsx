import { useState, useEffect, useCallback } from "react";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch quiz data
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/quiz");

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched data:", data);

      const formattedQuestions = data.questions.map((question, index) => ({
        id: question.id,
        question: question.description,
        options: question.options.map((option) => ({
          id: option.id,
          description: option.description,
        })),
        correctAnswerId: question.options.find((option) => option.is_correct)
          .id,
        number: index + 1,
      }));

      setQuestions(formattedQuestions);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching quiz data:", err);
      setError("Failed to fetch quiz data. Please try again.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle answer selection
  const handleAnswerClick = (optionId) => {
    if (selectedOption !== null) return;

    setSelectedOption(optionId);

    if (optionId === questions[currentIndex].correctAnswerId) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  // Move to next question
  const nextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null);
    } else {
      setQuizCompleted(true);
    }
  };

  // Move to previous question
  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      setSelectedOption(null);
    }
  };

  // Restart the quiz
  const restartQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setQuizCompleted(false);
    setSelectedOption(null);
    fetchData();
  };

  const getRemarks = () => {
    if (score === questions.length) {
      return "Congratulations, you aced the quiz! 🎉";
    } else if (score > questions.length / 2) {
      return "Great job! You did well! 👍";
    } else {
      return "Good effort! Keep trying and you'll improve! 💪";
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      {loading && <p className="text-gray-700 text-xl">Loading questions...</p>}
      {error && (
        <div className="text-center text-red-600">
          <p>{error}</p>
          <button
            onClick={fetchData}
            className="mt-4 px-5 py-2 bg-red-500 text-white font-bold rounded-lg shadow-md"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && !quizCompleted && questions.length > 0 && (
        <div className="w-full max-w-xl bg-white p-8 rounded-xl shadow-lg mb-6">
          <h2 className="text-lg font-semibold text-gray-500">
            Question {questions[currentIndex].number} of {questions.length}
          </h2>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">
            {questions[currentIndex].question}
          </h1>

          <div className="mt-5 space-y-3">
            {questions[currentIndex].options.map((option) => (
              <button
                key={option.id}
                className={`block w-full py-3 px-5 text-lg font-medium rounded-lg transition-all shadow-md border
                  ${
                    selectedOption === null
                      ? "bg-gray-100 hover:bg-blue-500 hover:text-white text-gray-800"
                      : selectedOption === option.id
                      ? option.id === questions[currentIndex].correctAnswerId
                        ? "bg-green-500 text-white border-green-600"
                        : "bg-red-500 text-white border-red-600"
                      : "bg-gray-200 text-gray-500"
                  }`}
                onClick={() => handleAnswerClick(option.id)}
                disabled={selectedOption !== null}
              >
                {option.description}
              </button>
            ))}
          </div>

          <div className="mt-6 flex justify-between">
            <button
              className={`px-5 py-2 text-gray-700 font-semibold rounded-lg transition shadow-md ${
                currentIndex > 0
                  ? "bg-gray-200 hover:bg-gray-300"
                  : "bg-gray-100 cursor-not-allowed"
              }`}
              onClick={prevQuestion}
              disabled={currentIndex === 0}
            >
              Previous
            </button>

            <button
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition shadow-md"
              onClick={nextQuestion}
            >
              {currentIndex + 1 < questions.length ? "Next" : "Finish Quiz"}
            </button>
          </div>
        </div>
      )}

      {/* Remarks Section */}
      {quizCompleted && (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center text-center px-6">
          <h2 className="text-6xl font-extrabold text-gray-900 mb-4">
            {getRemarks()}
          </h2>
          <p className="text-3xl font-semibold text-gray-700 mb-6">
            Your Score: <span className="font-bold text-blue-600">{score}</span>{" "}
            / {questions.length}
          </p>
          <button
            onClick={restartQuiz}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
