import { useQuery } from "@tanstack/react-query";
import { fetchMealsById } from "../../api";
import { Meal } from "../../types/Meal";
import { NavLink } from "react-router-dom";

type Props = {
  meal: Meal;
}
export const MealComponent: React.FC<Props> = ({ meal }) => {

  const {strMealThumb, strCategory, strArea, strMeal, idMeal} = meal;
  
    return (
        <div className="card" data-cy="meal-card">
          <div className="card-image">
            <figure className="image is-4by3">
              <img src={strMealThumb} alt="Meal source" />
            </figure>
          </div>
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <NavLink to={`/meal/${idMeal}`} className="title is-8">{strMeal}</NavLink>
              </div>
            </div>
            <div className="content">
              <p className=" is-8">{strCategory}</p>
              <p className=" is-8">{strArea}</p>
            </div>
          </div>
        </div>
      );
};