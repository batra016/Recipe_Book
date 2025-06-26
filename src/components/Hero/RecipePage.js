import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRecipeById } from "../../services/api";
import { useRecipeContext } from "../../context/RecipeContext";
import Search from "./Search";
import Footer from "./Footer";

const RecipePage = () => {
  const { id } = useParams();
  const { recipes } = useRecipeContext();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const localRecipe = recipes.find((r) => r.id.toString() === id);

    if (localRecipe) {
      setRecipe(localRecipe);
      setLoading(false);
      setError(null);
    } else {
      const getRecipe = async () => {
        try {
          setError(null); 
          const data = await fetchRecipeById(id);
          if (!data || data.status === "failure") {
            setError("Recipe not found or failed to fetch.");
            setRecipe(null);
          } else {
            setRecipe(data);
          }
        } catch (err) {
          console.error("Error fetching recipe by ID:", err);
          setError("Something went wrong. Please try again.");
        } finally {
          setLoading(false);
        }
      };
      getRecipe();
    }
  }, [id, recipes]);

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading recipe...</p>;

  if (error)
    return (
      <div className="text-center mt-10 text-red-600">
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Retry
        </button>
      </div>
    );

  if (!recipe)
    return (
      <p className="text-center mt-10 text-red-600">Recipe not found.</p>
    );

  const steps = recipe.analyzedInstructions?.[0]?.steps || [];

  return (
    <>
      <Search />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center mb-12 text-green-500 tracking-tight font-averia">
          {recipe.title}
        </h1>
        <div className="flex flex-col lg:flex-row items-start gap-10 mb-12">
          <div className="w-full lg:w-1/2 h-[320px] rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          <div className="w-full lg:w-1/2 space-y-4">
            <div className="bg-green-50 border border-green-200 p-4 rounded-xl text-gray-700 text-base shadow-sm">
              <strong className="text-green-500 block mb-1">Summary:</strong>
              <div dangerouslySetInnerHTML={{ __html: recipe.summary }} />
            </div>

            <div className="flex flex-wrap gap-3 mt-2">
              {recipe.vegetarian && (
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm hover:scale-105 transition">
                  Vegetarian
                </span>
              )}
              {recipe.vegan && (
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm hover:scale-105 transition">
                  Vegan
                </span>
              )}
              {recipe.glutenFree && (
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm hover:scale-105 transition">
                  Gluten Free
                </span>
              )}
              {recipe.dairyFree && (
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm hover:scale-105 transition">
                  Dairy Free
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-green-500">
            👩‍🍳 Cooking Instructions
          </h2>
          {steps.length > 0 ? (
            <ol className="space-y-6 list-decimal list-inside text-gray-800 text-[15px]">
              {steps.map((step) => (
                <li
                  key={step.number}
                  className="bg-gray-50 p-4 rounded-md shadow-sm border border-gray-200"
                >
                  <p className="mb-2">{step.step}</p>

                  {step.ingredients?.length > 0 && (
                    <div className="flex flex-wrap gap-3 mt-2">
                      {step.ingredients.map((ing, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full"
                        >
                          <img
                            src={`https://spoonacular.com/cdn/ingredients_100x100/${ing.image}`}
                            alt={ing.name}
                            className="w-5 h-5 rounded-full"
                          />
                          {ing.name}
                        </div>
                      ))}
                    </div>
                  )}

                  {step.equipment?.length > 0 && (
                    <div className="flex flex-wrap gap-3 mt-2">
                      {step.equipment.map((eq, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                        >
                          <img
                            src={eq.image}
                            alt={eq.name}
                            className="w-5 h-5 rounded-full"
                          />
                          {eq.name}
                        </div>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-gray-500">No instructions available.</p>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6 text-green-500">
            🧂 Ingredients
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recipe.extendedIngredients?.map((ing, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-sm hover:shadow-md transition"
              >
                <img
                  src={`https://spoonacular.com/cdn/ingredients_100x100/${ing.image}`}
                  alt={ing.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="text-gray-700 text-sm">{ing.original}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RecipePage;
