import React from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-green-600 mt-10 py-8 shadow-inner border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <h2 className="text-xl font-semibold">MyRecipeBook 🍲</h2>
            <p className="text-sm mt-1 text-gray-500">Cook it right, with the right recipe!</p>
          </div>

          <div className="flex gap-6 text-2xl">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-400"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-400"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-400"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} MyRecipeBook. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
