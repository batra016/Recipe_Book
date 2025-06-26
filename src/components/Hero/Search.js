import React, { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { BiFoodMenu } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import {
  fetchAutoCompleteSuggestions,
  fetchRecipesBySearch,
} from "../../services/api";
import { useRecipeContext } from "../../context/RecipeContext";

function Search({ scrollRef }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { setRecipes } = useRecipeContext();
  const navigate = useNavigate(); // for navigation

  useEffect(() => {
    const loadSuggestions = async () => {
      if (query.length > 2) {
        const result = await fetchAutoCompleteSuggestions(query);
        setSuggestions(result);
      } else {
        setSuggestions([]);
      }
    };
    loadSuggestions();
  }, [query]);

  const handleSelectSuggestion = async (suggestedText) => {
    setQuery(suggestedText);
    setSuggestions([]);
    const results = await fetchRecipesBySearch(suggestedText);
    setRecipes(results);
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const results = await fetchRecipesBySearch(query);
    setRecipes(results);
    setSuggestions([]);
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleHomeClick = () => {
    navigate("/"); // go to homepage
  };

  const handleMenuClick = () => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" }); // scroll to cards
  };

  return (
    <div className="relative w-full h-[100px] flex justify-between items-center px-16 z-50">
      {/* Left Icon - Home */}
      <div
        className="w-[60px] h-[60px] bg-white flex justify-center items-center rounded-md shadow-xl cursor-pointe hover:text-green-300"
        onClick={handleHomeClick}
      >
        <FaHome className="w-[30px] h-[30px] text-green-500" />
      </div>

      {/* Search Bar */}
      <form
        onSubmit={handleSubmit}
        className="relative w-[50%] h-[50px] bg-white flex items-center px-5 gap-5 rounded-md shadow-xl border-green-500 border-x-2 border-y-2"
      >
        <IoSearch className="text-green-500 w-[20px] h-[20px]" />
        <input
          type="text"
          placeholder="Search for recipes... 🍝"
          className="w-[100%] outline-none text-[20px]"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <ul className="absolute top-full left-0 w-full bg-white shadow-xl rounded-b-md border border-t-0 border-green-300 z-50 max-h-[200px] overflow-y-auto">
            {suggestions.map((s) => (
              <li
                key={s.id}
                className="px-4 py-2 text-gray-700 hover:bg-green-100 cursor-pointer"
                onClick={() => handleSelectSuggestion(s.title)}
              >
                {s.title}
              </li>
            ))}
          </ul>
        )}
      </form>

      {/* Right Icon - Menu */}
      <div
        className="w-[60px] h-[60px] bg-white flex justify-center items-center rounded-md shadow-xl cursor-pointer hover:text-green-300"
        onClick={handleMenuClick}
      >
        <BiFoodMenu className="w-[30px] h-[30px] text-green-500" />
      </div>
    </div>
  );
}

export default Search;
