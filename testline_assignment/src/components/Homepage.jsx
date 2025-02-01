import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900 px-4 md:px-8">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 tracking-tight text-center">
        Welcome to the Quiz Game! 🧠
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mb-8 text-center">
        Test your knowledge and challenge yourself!
      </p>
      <button
        onClick={() => navigate("/quiz")}
        className="px-8 py-3 bg-blue-600 text-white font-semibold text-lg rounded-full shadow-lg transition-all transform hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        Start Quiz 🚀
      </button>
    </main>
  );
};

export default Homepage;
