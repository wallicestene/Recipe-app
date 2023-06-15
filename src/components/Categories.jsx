import { Favorite, FavoriteBorderOutlined, KeyboardBackspace } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom"
import { useFavourite } from './DataLayer';
const Categories = () => {
    const [recipe, setRecipe] = useState([])

    const [isInFavourite, setIsInFavourite] = useState(false)

    const { category } = useParams()

    const [{favourite}, dispatch] = useFavourite()

    const history = useHistory()
//    handle click
    const handleClick = (item) => {
        const itemInFavourite = favourite.find(favItem => favItem.strMeal === item.strMeal)
 
        if(itemInFavourite){
        dispatch({
             type:'REMOVE_FAVOURITE',
             favourite: item
         })
         setIsInFavourite(true)
        }
        else{
         dispatch({
             type: "ADD_FAVOURITE",
             favourite: item,
         })
         setIsInFavourite(false)
        }
     }

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
        <div className='rounded-xl shadow-2xl w-80 md:w-auto' key={index}>
            <Link to={`/recipe/${item.strMeal}`} >
            <img src={item.strMealThumb} alt="" className='w-full md:w-50 lg:w-50 lg:object-contain object-contain'/>
             </Link>
             <div className='flex items-center justify-between p-3'> 
                <p className='text-1xl font-LosefinSans'>{item.strMeal}</p>
                <div className='addtoFav text-black cursor-pointer' onClick={() => handleClick(item)}>
                     {favourite.find((favItem) => favItem.strMeal === item.strMeal) ? (
                            <Favorite />
                            ) : (
                            <FavoriteBorderOutlined />
                        )}
            </div>
            </div>
        </div>
       
       ))}
       </div>
    </div>
  )
}

export default Categories