import axios from "axios";
import { Category, Meal } from "./types/Meal";

const API_CATEGORY_URL = "https://www.themealdb.com/api/json/v1/1/list.php?c=list";

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await axios.get(API_CATEGORY_URL);
  return response.data.meals;
};

const API_NAME_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

export const fetchMealsByLatters = async (): Promise<Meal[]> => {
  try {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const requests = alphabet.split('').map((letter) =>
        axios.get(`${API_NAME_URL}${letter}`));
    const responses = await Promise.all(requests);
    const allMealsIds = responses.flatMap((res) => res.data.meals || []);
    return allMealsIds;
} catch (error) {
    console.error("Помилка отримання рецептів:", error);
    return [];
}
};


const API_ID_URL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

export const fetchMealsById = async (id: number): Promise<Meal[]> => {
  const response = await axios.get(`${API_ID_URL}${id}`);
  console.log( response.data);
  return response.data.meals;
};

const API_URL = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";

// export const fetchMealsByCategories = async (): Promise<Meal[]> => {
//     try {
//         const categories = await fetchCategories();
//         const requests = categories.map(({ strCategory }) => axios.get(`${API_URL}${strCategory}`));
//         const responses = await Promise.all(requests);

//         const allMealsIds = responses.flatMap((res) => res.data.meals || []);
//         const mealRequests = allMealsIds.map(({ idMeal }) => fetchMealsById(idMeal));  // Оновлено, щоб викликати fetchMealsById
//         const meals = await Promise.all(mealRequests);
        
//         return meals; // Всі страви після обробки
//     } catch (error) {
//         console.error("Помилка отримання рецептів:", error);
//         return [];
//     }
// };

