import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src="/logo.svg" alt="Healthcare Logo" className="h-8 w-auto" />
          <span className="ml-2 text-2xl font-bold">
            <span className="text-teal-600">Health</span>
            <span className="text-teal-400">care</span>
          </span>
        </div>

        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-700 hover:text-teal-600">
            Home
          </a>
          <a
            href="#services"
            className="text-teal-600 border-b-2 border-teal-600"
          >
            Service
          </a>
          <a href="#" className="text-gray-700 hover:text-teal-600">
            Contact Us
          </a>
          <a href="#" className="text-gray-700 hover:text-teal-600">
            Help
          </a>
          <a href="#" className="text-gray-700 hover:text-teal-600">
            Blogs
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <button className="hidden md:block text-teal-600 font-medium hover:text-teal-700">
            Sign Up
          </button>
          <button className="bg-teal-600 text-white px-4 py-2 rounded font-medium hover:bg-teal-700">
            Log In
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
