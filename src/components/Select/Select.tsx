import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../../api";
import { useEffect, useRef } from "react";
import React from "react";
import { SetURLSearchParams } from "react-router-dom";

type Props = {
    searchParams: URLSearchParams;
    setSearchParams: SetURLSearchParams;
}
export const Select: React.FC<Props> = React.memo(({searchParams, setSearchParams}) => {
    const { data } = useQuery({
        queryKey: ["categoties"],
        queryFn: fetchCategories,
      });  
      const changeHandle = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value);
        searchParams.set('category', event.target.value);
        setSearchParams(searchParams);
    }
    const select = useRef(null);
    useEffect(() => {
        const categoryValue = searchParams.get('category');
        if(select.current)
            select.current.value = categoryValue;
        
    }, [select.current])    
      
    return(
        <div className="select is-rounded">
            <select onChange={changeHandle} ref={select}>
                <option>All</option>
                {data?.map(category => 
                    <option key={category.strCategory}>{category.strCategory}</option>
                )}
            </select>
        </div>
    )
});