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
  const [error, setError] = useState(null); // Error message
  const { setRecipes } = useRecipeContext();
  const navigate = useNavigate();

  useEffect(() => {
    const loadSuggestions = async () => {
      try {
        if (query.length > 2) {
          const result = await fetchAutoCompleteSuggestions(query);
          setSuggestions(result);
        } else {
          setSuggestions([]);
        }
      } catch (err) {
        console.error("Autocomplete error:", err);
        setError("Failed to load suggestions.");
      }
    };
    loadSuggestions();
  }, [query]);

  const handleSelectSuggestion = async (suggestedText) => {
    try {
      setQuery(suggestedText);
      setSuggestions([]);
      const results = await fetchRecipesBySearch(suggestedText);

      if (results.length === 0) {
        setError("No recipes found for your search.");
      } else {
        setError(null);
      }

      setRecipes(results);
      scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      console.error("Search error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const results = await fetchRecipesBySearch(query);

      if (results.length === 0) {
        setError("No recipes found for your search.");
      } else {
        setError(null);
      }

      setRecipes(results);
      setSuggestions([]);
      scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      console.error("Search error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleMenuClick = () => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative w-full flex flex-col items-center z-50">
      {/* Top Bar */}
      <div className="w-full h-[100px] flex justify-between items-center px-16">
        {/* Left Icon */}
        <div
          className="w-[60px] h-[60px] bg-white flex justify-center items-center rounded-md shadow-xl cursor-pointer hover:text-green-300"
          onClick={handleHomeClick}
        >
          <FaHome className="w-[30px] h-[30px] text-green-500" />
        </div>

        {/* Search */}
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
          {/* Autocomplete Suggestions */}
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

        {/* Right Icon */}
        <div
          className="w-[60px] h-[60px] bg-white flex justify-center items-center rounded-md shadow-xl cursor-pointer hover:text-green-300"
          onClick={handleMenuClick}
        >
          <BiFoodMenu className="w-[30px] h-[30px] text-green-500" />
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="text-red-500 mt-2 font-medium text-center">
          {error}
        </div>
      )}
    </div>
  );
}

export default Search;
