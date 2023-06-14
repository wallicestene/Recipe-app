import { KeyboardBackspace } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom"
const Categories = () => {
    const [recipe, setRecipe] = useState([])
    const { category } = useParams()

    const history = useHistory()
   

    useEffect(() => {
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then(res => res.json())
        .then(data => {
            setRecipe(data.meals)
            console.log(data.meals)
        })
        .catch(err => console.log(err.message))
    }, [])

  return (
    <div className=''>
        <div className='p-3'>
            <div className=' inline hover:cursor-pointer' onClick={() => history.go("-1")}><KeyboardBackspace fontSize='large'/></div>
        </div>
        <div className='grid grid-cols-1 place-items-center gap-5 md:grid-cols-4 lg:grid-cols-4 lg:place-items-center rounded-lg'>
       { recipe.map((item, index) => (
        <Link to={`/recipe/${item.strMeal}`} key={index}>
        <div className='rounded-xl shadow-2xl w-80 md:w-auto' >
            <img src={item.strMealThumb} alt="" className='w-full md:w-50 lg:w-50 lg:object-contain object-contain'/>
            <div>
                <p className='py-5 text-1xl px-2 font-LosefinSans'>{item.strMeal}</p>
            </div>
        </div>
        </Link>
       ))}
       </div>
    </div>
  )
}

export default Categories