import {KeyboardBackspace } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from "react-router-dom";
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
              <li key={i} className=' w-32 h-full border rounded-2xl  shadow-2xl font-LosefinSans '>
                <div className='h-10 w-20 relative top-0'>
                     <p className='text-xs text-white p-2 inline-block'>{measure} {ingredient}</p>
                </div>
                <img src={ingredientImageSrc} alt="" className='h-24 w-full object-contain'/>
              </li>
            );
          }
        }
        return ingredients;
      };

      if (loading) {
        return <h1>Loading...</h1>;
      }

  return (
    <div className='recipe-page relative my-5 text-slate-800'>
        <div className='grid lg:grid-cols-2 md:grid-cols-2 gap-3 lg:gap-5 grid-cols-1'>
            {/* left side */}
            
        <div className='left lg:w-full grid grid-cols-1 lg:gap-5 lg:flex flex-col gap-3'>
            <div className='relative'>
                <img src={recipe.strMealThumb} alt="" className='w-full lg:h-72 lg:object-cover opacity-90 rounded-lg'/>
            <div className='absolute top-3 left-4 bg-slate-800 text-white rounded-md p-1 hover:cursor-pointer' onClick={() => history.go(-1)}>
             <KeyboardBackspace fontSize='large'/>   
            </div>
            <div className='absolute top-1/2 left-4  bg-gray-300 lg:p-2 p-1 rounded-sm shadow-md bg-opacity-70'>
            <h1 className=' font-LosefinSans lg:text-xl '>{recipe.strMeal}</h1>  
            </div>
            </div>
            
            
            <div className='shadow-2xl'>
            <h2 className='text-3xl font-Lora font-bold mb-5 p-3'>Ingredients</h2>
            <ul className='ing flex overflow-x-scroll gap-5 p-5 scroll-smooth bg-gradient-to-b from-gray-500 from-10% to-100% via-slate-400 rounded-lg'>{renderIngredients()}</ul>
           </div>
        </div>
        <div className='rounded-lg border p-2 shadow-inner'>
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