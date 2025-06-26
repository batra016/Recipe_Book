const API_KEY = process.env.REACT_APP_SPOON_API_KEY;
const BASE_URL = "https://api.spoonacular.com";

export const fetchRandomRecipes = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/recipes/random?includeNutrition=true&number=2&apiKey=${API_KEY}`
    );
    const data = await response.json();
    return data.recipes;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};


export const fetchRecipeById = async (id) => {
  try {
    const response = await fetch(
      `${BASE_URL}/recipes/${id}/information?includeNutrition=true&apiKey=${API_KEY}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching recipe by ID:", error);
    return null;
  }
};

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
      `${BASE_URL}/recipes/complexSearch?${queryParam}&number=2&apiKey=${API_KEY}`
    );
    const data = await response.json();
    const recipeIds = data.results.map((r) => r.id);

    const fullRecipePromises = recipeIds.map((id) =>
      fetch(`${BASE_URL}/recipes/${id}/information?includeNutrition=true&apiKey=${API_KEY}`)
        .then((res) => res.json())
        .catch((err) => {
          console.error("Error fetching full recipe info:", err);
          return null;
        })
    );

    // Step 3: Wait for all fetches to complete
    const fullRecipes = await Promise.all(fullRecipePromises);

    // Step 4: Filter out any failed/null responses
    return fullRecipes.filter((r) => r !== null);
  } catch (error) {
    console.error("Error fetching category recipes:", error);
    return [];
  }
};
export const fetchAutoCompleteSuggestions = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/recipes/autocomplete?number=5&query=${query}&apiKey=${API_KEY}`
    );
    return await response.json();
  } catch (error) {
    console.error("Autocomplete error:", error);
    return [];
  }
};
export const fetchRecipesBySearch = async (query) => {
  try {
    const searchResponse = await fetch(
      `${BASE_URL}/recipes/complexSearch?query=${query}&number=9&apiKey=${API_KEY}`
    );
    const searchData = await searchResponse.json();

    const ids = searchData.results.map((r) => r.id);

    const fullDetails = await Promise.all(
      ids.map((id) =>
        fetch(`${BASE_URL}/recipes/${id}/information?includeNutrition=true&apiKey=${API_KEY}`)
          .then((res) => res.json())
          .catch((err) => null)
      )
    );

    return fullDetails.filter((r) => r !== null);
  } catch (error) {
    console.error("Error searching recipes:", error);
    return [];
  }
};
