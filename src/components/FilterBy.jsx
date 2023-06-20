import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const FilterBy = ({filterByArea, filterByIngredient}) => {
    const [area, setArea] = useState([])

    const [ingredients, setIngredients] = useState([])

    useEffect(() => {
        // feching the list of areas
        fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
        .then(res => res.json())
        .then((data) =>{
            setArea(data.meals)
            console.log(data.meals);
        })
        // fetching the list of Ingredients
        fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
        .then(res => res.json())
        .then((data) =>{
            setIngredients(data.meals)
            console.log(data.meals);
        })
    }, [])
  return (
    <section className=''>
        <div>
        <div>
            <h1>Filter By</h1>
        </div>
        <div>
            <div>
                <h1>Area</h1>
        <ul className="filter-by flex overflow-x-scroll gap-2">
            {
               area && area.length > 0 ? (
                    <>
                    {area.map((place, index) => (
                        <li className='bg-slate-200 lg:p-2 md:p-2 p-1 rounded-full' key={index} onClick={() => filterByArea(place.strArea)}>
                            <div>{place.strArea}</div>
                        </li>
                    ))}
                    </>
                ) : (
                    <p>Loading...</p>
                )
            }
        </ul>
            </div>
            <div>
            <h1>Ingredients</h1>
        <ul className="filter-by flex overflow-scroll gap-2 h-72">
            {
               area &&  area.length > 0 ? (
                    <div className='grid grid-cols-3 gap-3'>
                    {ingredients.map((ingredient, index) => (
                        <li className='bg-slate-200 lg:p-2  h-fit   md:py-2 py-1 rounded-full text-sm tracking-tighter text-center' key={index} onClick={() => filterByIngredient(ingredient.strIngredient)}>
                            {ingredient.strIngredient}
                        </li>
                    ))}
                    </div>
                ) : (
                    <p>Loading...</p>
                )
            }
        </ul>
            </div>
        
        </div>
        </div>
    </section>
  )
}

export default FilterBy