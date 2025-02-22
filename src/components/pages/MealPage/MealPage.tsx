import { useParams } from 'react-router-dom';
import './MealPage.css'
import { fetchMealsById } from '../../../api';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Meal } from '../../../types/Meal';
import { ClipLoader } from "react-spinners";
import React from 'react';

export const MealPage = React.memo(() => {

    const [meal, setMeal] = useState<Meal | undefined>(undefined)
    const {mealId} = useParams();

    const { data } = useQuery({
        queryKey: ["meals"],
        queryFn: () => fetchMealsById(Number(mealId)),
      }); 

    useEffect(()=>{
        if(data){
            setMeal(data[0]);
        }
    },[data])
    return (
        <> 
        { meal ? 
        <div className="recipe-container">
        <header className="recipe-header">
          <img src={meal.strMealThumb} alt={meal.strMeal} />
          <h1>{meal.strMeal}</h1>
          <p>{meal.strCategory}</p>
          <p>{meal.strArea}</p>
          <p>{meal.strTags}</p>
        </header>
  
        <section className="recipe-details">
          <h2>Ingredients</h2>
          <ul>
            {Array.from({ length: 20 }).map((_, index) => {
              const ingredient = meal[`strIngredient${index + 1}`];
              const measure = meal[`strMeasure${index + 1}`];
              if (ingredient && measure) {
                return (
                  <li key={index}>
                    {measure} of {ingredient}
                  </li>
                );
              }
              return null;
            })}
          </ul>
  
          <h2>Instructions</h2>
          <p>{meal.strInstructions}</p>
  
          <h2>Video</h2>
          <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer">
            Watch on YouTube
          </a>
  
          <h2>Source</h2>
          <p>{meal.strSource}</p>
        </section>
      </div> : <ClipLoader color="#36d7b7" size={70} />}
      </> 
    )
});