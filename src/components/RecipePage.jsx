import {KeyboardBackspace } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from "react-router-dom";
const RecipePage = () => {
    const [recipe, setRecipe] = useState([])

    const { name } = useParams()

    const history = useHistory()
    const ingerideientsArr = [1,2,3,4,5,6,7,8,9]
    let ingName = 0
    for(let i = 0; i < ingerideientsArr.length; i++ ){

        ingName = ingerideientsArr[i]
        console.log(ingName)
    }

    useEffect(() => {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
        .then(res => res.json())
        .then(data =>{
            setRecipe(data.meals[0])
            console.log(data.meals[0])
        })
        .catch(err => console.log(err.message))
    }, [])

  return (
    <div className='recipe-page relative bg-slate-400'>
        <div className='grid lg:grid-cols-2 md:grid-cols-2 gap-3 lg:gap-5 grid-cols-1'>
        <div className='left lg:w-full grid grid-cols-1 gap-2'>
            <img src={recipe.strMealThumb} alt="" className='w-full lg:h-72 lg:object-cover opacity-90'/>
            <div className='absolute top-3 left-4 text-white' onClick={() => history.go(-1)}>
             <KeyboardBackspace fontSize='large'/>   
            </div>
            <div>
            <h2>Ingredients</h2>
            <img src={`https://www.themealdb.com/images/ingredients/${recipe.strIngredient6}-Small.png`} alt="" />
           </div>
        </div>
        <div>
           <p>
            {recipe.strInstructions}
           </p>
        </div>
        </div>
    </div>
  )
}

export default RecipePage