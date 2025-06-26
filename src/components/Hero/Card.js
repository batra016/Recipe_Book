import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ recipe }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipe/${recipe.id}`);
  };

  return (
    <div className="border rounded-xl shadow hover:shadow-xl transition p-4">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-50 object-cover rounded-md"
      />
      <h2 className="text-xl font-semibold mt-3">{recipe.title}</h2>
      <p className="text-sm text-gray-600 mt-1 font-bold">
        ⏱ Ready in: <span className="text-green-600">{recipe.readyInMinutes} mins</span>
      </p>
      <p className="text-sm text-gray-600 font-bold">
        🍽 Servings: <span className="text-green-600">{recipe.servings}</span>
      </p>
      <br />
      <button
        className="w-full p-1 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-all h-8"
        onClick={handleClick}
      >
        View Detail
      </button>
    </div>
  );
};

export default Card;
