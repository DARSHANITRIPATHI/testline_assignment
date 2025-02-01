import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import React from "react"; 
import Homepage from "./components/Homepage";
import Quiz from "./components/quiz";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
      <Footer/>
    </Router>
  
  );
}

export default App;
