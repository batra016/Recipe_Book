// Cards.jsx
import React, { useState, useEffect, forwardRef } from "react";
import { fetchRandomRecipes, fetchRecipesByCategory } from "../../services/api";
import Card from "./Card";
import { useRecipeContext } from "../../context/RecipeContext";

const Cards = forwardRef(({ selectedCategory }, ref) => {
  const { recipes, setRecipes } = useRecipeContext();
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 6;

  useEffect(() => {
    const getData = async () => {
      try {
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

        setCurrentPage(1); 
        ref?.current?.scrollIntoView({ behavior: "smooth" }); 
      } catch (error) {
        console.error("Error fetching recipes:", error);
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentRecipes.map((recipe) => (
          <Card key={recipe.id} recipe={recipe} />
        ))}
      </div>

      {recipes.length > recipesPerPage && (
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
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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
