import React, { useState, useEffect, forwardRef } from "react";
import { fetchRandomRecipes, fetchRecipesByCategory } from "../../services/api";
import Card from "./Card";
import { useRecipeContext } from "../../context/RecipeContext";

const Cards = forwardRef(({ selectedCategory }, ref) => {
  const { recipes, setRecipes } = useRecipeContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null); // 🔴 New state for error
  const recipesPerPage = 6;

  useEffect(() => {
    const getData = async () => {
      try {
        setError(null); // reset previous error
        let data = [];

        if (selectedCategory.toLowerCase() === "all") {
          if (recipes.length === 0) {
            data = await fetchRandomRecipes();
            setRecipes(data);
          }
        } else {
          data = await fetchRecipesByCategory(selectedCategory);
          setRecipes(data);
        }

        if (data.length === 0) {
          setError("No recipes found. Try a different category or search.");
        }

        setCurrentPage(1);
        ref?.current?.scrollIntoView({ behavior: "smooth" });
      } catch (error) {
        setError(error.message || "Something went wrong while loading recipes.");
      }
    };

    getData();
  }, [selectedCategory, setRecipes, ref]);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  return (
    <div className="p-6 max-w-7xl mx-auto" ref={ref}>
      {/* 🔴 Error Message */}
      {error && (
        <div className="text-red-500 text-center mb-4 font-medium">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {!error &&
          currentRecipes.map((recipe) => (
            <Card key={recipe.id} recipe={recipe} />
          ))}
      </div>

      {!error && recipes.length > recipesPerPage && (
        <div className="flex justify-center mt-8 items-center space-x-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded font-medium ${
              currentPage === 1
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            ← Prev
          </button>

          <span className="text-gray-600 font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded font-medium ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
});

export default Cards;
