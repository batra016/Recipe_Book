const API_KEY = process.env.REACT_APP_SPOON_API_KEY;
const BASE_URL = "https://api.spoonacular.com";

// 1. Fetch Random Recipes
export const fetchRandomRecipes = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/recipes/random?includeNutrition=true&number=12&apiKey=${API_KEY}`
    );
    if (!response.ok) throw new Error("Failed to fetch random recipes.");
    const data = await response.json();
    return data.recipes || [];
  } catch (error) {
    throw new Error("Unable to load random recipes. Please try again.");
  }
};

// 2. Fetch Recipe by ID
export const fetchRecipeById = async (id) => {
  try {
    const response = await fetch(
      `${BASE_URL}/recipes/${id}/information?includeNutrition=true&apiKey=${API_KEY}`
    );
    if (!response.ok) throw new Error("Failed to fetch recipe.");
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Unable to fetch recipe details.");
  }
};

// 3. Fetch Recipes by Category
export const fetchRecipesByCategory = async (category) => {
  let queryParam = "";

  switch (category.toLowerCase()) {
    case "vegan":
      queryParam = "diet=vegan";
      break;
    case "vegetarian":
      queryParam = "diet=vegetarian";
      break;
    case "gluten free":
      queryParam = "intolerances=gluten";
      break;
    case "dairy free":
      queryParam = "intolerances=dairy";
      break;
    case "healthy":
      queryParam = "sort=healthiness";
      break;
    case "all":
    default:
      queryParam = "";
  }

  try {
    const response = await fetch(
      `${BASE_URL}/recipes/complexSearch?${queryParam}&number=6&apiKey=${API_KEY}`
    );
    if (!response.ok) throw new Error("Failed to fetch category recipes.");
    const data = await response.json();

    if (!data.results.length) {
      throw new Error("No recipes found for this category.");
    }

    const recipeIds = data.results.map((r) => r.id);
    const fullRecipePromises = recipeIds.map((id) =>
      fetch(`${BASE_URL}/recipes/${id}/information?includeNutrition=true&apiKey=${API_KEY}`)
        .then((res) => {
          if (!res.ok) throw new Error("Recipe fetch failed");
          return res.json();
        })
        .catch((err) => {
          console.error("Error fetching full recipe info:", err.message);
          return null;
        })
    );

    const fullRecipes = await Promise.all(fullRecipePromises);
    const filtered = fullRecipes.filter((r) => r !== null);
    if (filtered.length === 0) throw new Error("No complete recipe data found.");
    return filtered;
  } catch (error) {
    throw new Error(error.message || "Error loading category recipes.");
  }
};

// 4. Autocomplete Suggestions
export const fetchAutoCompleteSuggestions = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/recipes/autocomplete?number=5&query=${query}&apiKey=${API_KEY}`
    );
    if (!response.ok) throw new Error("Failed to fetch suggestions.");
    return await response.json();
  } catch (error) {
    throw new Error("Unable to load suggestions. Please try again.");
  }
};

// 5. Search Recipes
export const fetchRecipesBySearch = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/recipes/complexSearch?query=${query}&number=9&addRecipeInformation=true&apiKey=${API_KEY}`
    );
    if (!response.ok) throw new Error("Failed to search recipes.");
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      throw new Error("No recipes found for your search.");
    }

    return data.results;
  } catch (error) {
    throw new Error(error.message || "Search failed. Please try again.");
  }
};
