import { Skeleton } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const FilterBy = ({filterByArea, filterByIngredient, setShowFilterBy, showFilterBy}) => {
    const [area, setArea] = useState([])
    const skeleton = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,,18,19,20]
    const [ingredients, setIngredients] = useState([])

    useEffect(() => {
        // feching the list of areas
        fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
        .then(res => res.json())
        .then((data) =>{
            setArea(data.meals)
        })
        // fetching the list of Ingredients
        fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
        .then(res => res.json())
        .then((data) =>{
            setIngredients(data.meals)
        })
    }, [])
  return (
    <section className=''>
        <div>
        <div>
            <div>
                <h1 className=' font-LosefinSans text-lg border-b-2 mb-1 border-slate-700'>By Area:</h1>
        <ul className="area filter-by flex overflow-x-scroll gap-2 p-2">
            {
               area && area.length > 0 ? (
                    <>
                    {area.map((place, index) => (
                        <li className='bg-slate-200 lg:p-2 md:p-2 p-1 rounded-lg shadow-md hover:cursor-pointer || transition ease-in-out delay-100 hover:-translate-x-1 hover:scale-105 duration-200 hover:bg-gradient-to-r from-gray-400 via-slate-400 to-slate-500 hover:text-white' key={index} onClick={() => {
                            filterByArea(place.strArea)
                            setShowFilterBy(!showFilterBy)
                        }}>
                            <div>{place.strArea}</div>
                        </li>
                    ))}
                    </>
                ) : (
                    <div className='flex gap-3'>
                        {
                            skeleton.map((item, index) => (
                               <div key={index} className='shadow-md'>
                                 <Skeleton sx={{ bgcolor: "grey.900" }}  variant="rounded" width={50} height={30} />
                               </div>
                            ))
                        }
                    </div>
                )
            }
        </ul>
            </div>
            <div>
            <h1 className=' font-LosefinSans text-lg border-b-2 mb-1 border-slate-700'>By Ingredients:</h1>
        <ul className="ingredients filter-by flex overflow-y-scroll gap-2 h-60">
            {
               ingredients &&  ingredients.length > 0 ? (
                    <div className='grid lg:grid-cols-3 grid-cols-2 gap-3'>
                    {ingredients.map((ingredient, index) => (
                        <li className=' bg-slate-200 lg:p-2  h-fit p-2 rounded-lg shadow-md text-sm lg:text-base text-center hover:cursor-pointer || transition ease-in-out delay-100 hover:translate-x-1 hover:scale-105 duration-200 hover:bg-gradient-to-r from-gray-400 via-slate-400 to-slate-500 hover:text-white' key={index} onClick={() => {
                            filterByIngredient(ingredient.strIngredient)
                            setShowFilterBy(!showFilterBy)
                        }}>
                            {ingredient.strIngredient}
                        </li>
                    ))}
                    </div>
                ) : (
                        <div className='grid lg:flex flex-wrap justify-around lg:gap-5 grid-cols-2 gap-3 '>
                        {
                            skeleton.map((item, index) => (
                               <div key={index} className=' shadow-md'>
                                 <Skeleton sx={{ bgcolor: "grey.900" }}  variant="rounded" width={140} height={35} />
                               </div>
                            ))
                        }
                    </div>
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