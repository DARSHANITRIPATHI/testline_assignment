import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-900 shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo/Brand */}
        <div className="text-2xl font-bold text-white">EduMaster</div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8">
          <a href="/" className="text-white hover:text-yellow-400 transition">
            Home
          </a>
          <a
            href="/courses"
            className="text-white hover:text-yellow-400 transition"
          >
            Courses
          </a>
          <a
            href="/about"
            className="text-white hover:text-yellow-400 transition"
          >
            About Us
          </a>
          <a
            href="/contact"
            className="text-white hover:text-yellow-400 transition"
          >
            Contact
          </a>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex space-x-4">
          <button className="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition">
            Login
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
            Sign Up
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            className="text-white focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 py-4 bg-blue-900 shadow-md">
          <a href="/" className="text-white hover:text-yellow-400 transition">
            Home
          </a>
          <a
            href="/courses"
            className="text-white hover:text-yellow-400 transition"
          >
            Courses
          </a>
          <a
            href="/about"
            className="text-white hover:text-yellow-400 transition"
          >
            About Us
          </a>
          <a
            href="/contact"
            className="text-white hover:text-yellow-400 transition"
          >
            Contact
          </a>
          <button className="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition">
            Login
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
            Sign Up
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
