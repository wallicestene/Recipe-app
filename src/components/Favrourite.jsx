import React from 'react'
import { useFavourite } from './DataLayer'
import { Delete } from '@mui/icons-material'
import { Link } from 'react-router-dom/cjs/react-router-dom'

const Favrourite = () => {
    const [{favourite}, dispatch] = useFavourite()
    
    const removeFromFavourites = (item) =>{
        dispatch({
            type:'REMOVE_FAVOURITE',
            favourite: item
        })
    }

  return (
    <div className='fav bg-gray-50 rounded-md shadow-lg border text-slate-800 lg:h-96 h-72 overflow-auto relative scroll-smooth'>
        <div className='px-5 py-3 border-b-2 mb-2 sticky top-0 bg-white'>
            <h1 className=' font-Lora font-bold tracking-wide text-lg '>Favourites</h1>
        </div>
        {
           favourite && favourite.length > 0 ? (
                <div className='flex flex-col gap-3 lg:gap-5'>
            {favourite.map((item, index) => (
                
                <div className='flex justify-between items-center shadow-sm p-2' key={index} >
                    <Link to={`/recipe/${item.strMeal}`} >
                    <div className='flex items-center gap-5'>
                        <div>
                            <img src={item.strMealThumb} alt="" className='h-20 w-20 rounded-full object-contain' />
                        </div>
                        <div>
                           <h1 className=' font-LosefinSans lg:text-lg text-base'>{item.strMeal}</h1> 
                        </div>
                    </div>
                    </Link>
                    <div className=' cursor-pointer' onClick={() => removeFromFavourites(item)}>
                        <Delete/>
                    </div>
                </div>
                
            ))}
           
        </div>
            ) : (
                <div className=' flex items-center justify-center'>
                    <p className=' text-gray-600 lg:px-28'>Click the ❤️ to add to Favourites</p>
                </div>
                
            )
        }
    </div>
  )
}

export default Favrourite