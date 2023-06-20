import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const FilterBy = ({filterByArea, filterByIngredient, setShowFilterBy, showFilterBy}) => {
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
            <div>
                <h1 className=' font-LosefinSans text-lg border-b-2 mb-1'>Area</h1>
        <ul className="filter-by flex overflow-x-scroll gap-2 p-2">
            {
               area && area.length > 0 ? (
                    <>
                    {area.map((place, index) => (
                        <li className='bg-slate-200 lg:p-2 md:p-2 p-1 rounded-full hover:cursor-pointer' key={index} onClick={() => {
                            filterByArea(place.strArea)
                            setShowFilterBy(!showFilterBy)
                        }}>
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
            <h1 className=' font-LosefinSans text-lg border-b-2 mb-1'>Ingredients</h1>
        <ul className="filter-by flex overflow-y-scroll gap-2 h-60">
            {
               area &&  area.length > 0 ? (
                    <div className='grid lg:grid-cols-3 grid-cols-2 gap-3'>
                    {ingredients.map((ingredient, index) => (
                        <li className='bg-slate-200 lg:p-2  h-fit   md:py-2 py-1 rounded-full text-sm lg:text-base text-center hover:cursor-pointer' key={index} onClick={() => {
                            filterByIngredient(ingredient.strIngredient)
                            setShowFilterBy(!showFilterBy)
                        }}>
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