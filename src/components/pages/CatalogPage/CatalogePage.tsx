import './CatalogPage.css' 
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo, useCallback, } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchMealsByLatters } from "../../../api";
import { Meal } from "../../../types/Meal";
import { MealComponent } from "../../MealCard/MealCard";
import { Pagination } from "../../Pagination/Pagination";
import { Select } from '../../Select/Select';
import { debounce } from "lodash";

export const CatalogePage = () => {
    const [query, setQuery] = useState<string>('');
    const [searchParams, setSearchParams] = useSearchParams();
    const [meals, setMeals] = useState<Meal[] | []>([])
    const { data } = useQuery({
      queryKey: ["meals"],
      queryFn: fetchMealsByLatters,
    });

    const debouncedSetQuery = useCallback(
      debounce((value: string) => setQuery(value), 500),
      []
    );
    
    const searchHandle = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      debouncedSetQuery(event.target.value);
    }, [debouncedSetQuery]);
   
    
    const filteredData = useMemo(() => (data || []).filter(meal => {
      if (searchParams.get('category') === 'All' || searchParams.get('category') === null) {
        return true;
      } else {
        return meal.strCategory === searchParams.get('category')
      }
    }).filter((meal) =>
      meal.strMeal.toLowerCase().includes(query.toLowerCase()),
    ),[data, query, searchParams])
    return (
      <>
      {data ?
        <>
        <input
          className="input is-link"
          type="text"
          placeholder="Search meal"
          onChange={searchHandle}
        />
        <Select 
              searchParams={searchParams}
              setSearchParams={setSearchParams} />
          <div className='meals'>
            {meals.map(meal => <MealComponent key={meal.idMeal} meal={meal} />)}
          </div>
          <Pagination
              productCountPerPage={16}
              mealsFromServer={filteredData}
              setMealsToShow={setMeals}
              searchParams={searchParams}
              setSearchParams={setSearchParams} /></> : <p>loading...</p>
      }
      </>
    );
  }


 