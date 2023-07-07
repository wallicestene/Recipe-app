import {KeyboardBackspace, PlayArrow, PlayArrowOutlined } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from "react-router-dom";
import { Link } from 'react-router-dom/cjs/react-router-dom';
const RecipePage = () => {
    const [recipe, setRecipe] = useState([])
    const [loading, setLoading] = useState(true);

    const { name } = useParams()

    const history = useHistory()
   

    useEffect(() => {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
        .then(res => res.json())
        .then(data =>{
            setRecipe(data.meals[0])
            setLoading(false);
        })
        .catch(err => console.log(err.message))
    }, [])
// ingredients

    const renderIngredients = () => {
        if (!recipe) {
            return null;
          }

        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
          const ingredient = recipe[`strIngredient${i}`];
          const measure = recipe[`strMeasure${i}`];
          const ingredientImageSrc = `https://www.themealdb.com/images/ingredients/${ingredient}-Small.png`;
          if (ingredient && measure) {
            ingredients.push(
              <li key={i} className=' lg:w-32 md:w-32 w-30 h-full border rounded-lg overflow-hidden  shadow-2xl font-LosefinSans relative flex-shrink-0 bg-slate-900'>
                <div className='absolute top-2 right-1 left-1 border rounded border-gray-600 bg-slate-900 z-40 p-1 bg-opacity-50'>
                     <p className='lg:text-sm md:text-sm text-xs text-white'>{measure} {ingredient}</p>
                </div>
                <img src={ingredientImageSrc} alt="" className='h-full w-full object-contain opacity-90'/>
              </li>
            );
          }
        }
        return ingredients;
      };

      if (loading) {
        return (
          <div className=' grid place-items-center h-screen'>
            <div className='grid place-items-center font-poppins'>
              <CircularProgress/>
            <p>Fetching Recipe...</p>
            </div>
            
          </div>
        );
      }
  return (
    <div className='recipe-page relative my-5 text-slate-800'>
        <div className='grid lg:grid-cols-2 md:grid-cols-2 gap-3 lg:gap-5 grid-cols-1'>
            {/* left side */}
            
        <div className='left lg:w-full grid grid-cols-1 lg:gap-5 lg:flex flex-col gap-3'>
            <div className='relative'>
                <img src={recipe.strMealThumb} alt="" className='w-full lg:h-72 lg:object-cover opacity-90 rounded-lg'/>
            <div className='absolute top-3 left-4 bg-gray-200 bg-opacity-70 rounded-md p-1 hover:cursor-pointer' onClick={() => history.go(-1)}>
             <KeyboardBackspace fontSize='large'/>   
            </div>
            <div className='absolute top-1/2 left-4 flex flex-col gap-4 w-fit'>
              <div className=' bg-gray-300 lg:p-2 p-1 rounded-sm shadow-md bg-opacity-70'>
            <h1 className=' font-LosefinSans lg:text-xl '>{recipe.strMeal}</h1>
            </div>
            {
              recipe.strYoutube &&
              <div className=' bg-gray-300 px-1 rounded-full shadow-md bg-opacity-70 w-fit'>
              <a href={recipe.strYoutube} className='flex items-center'>
             <h1 className='font-LosefinSans lg:text-xl  '>Watch Video</h1>              <div>
              <div className='text-slate-900'>
              <PlayArrow fontSize='large'/>
              </div>
              </div>
              </a>
            </div>
            }
            </div>
            
            </div>
            
            
            <div className='shadow-2xl'>
            <h2 className='text-3xl font-Lora font-bold mb-5 p-3'>Ingredients</h2>
            <ul className='ing h-30 lg:h-28 flex overflow-x-scroll gap-5 p-1 scroll-smooth rounded-lg'>{renderIngredients()}</ul>
           </div>
        </div>
        <div className='rounded-lg border p-2 shadow'>
            <h1 className='text-3xl font-Lora font-bold mb-5'>Instructions</h1>
           <p className=' font-LosefinSans lg:text-lg'>
            {recipe.strInstructions}
           </p>
        </div>
        </div>
    </div>
  )
}

export default RecipePage