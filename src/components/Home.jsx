import React, { useEffect, useState } from 'react'
import Filterpage from './Filterpage'
import { AccessTime } from '@mui/icons-material'
import { Link } from 'react-router-dom/cjs/react-router-dom'

const Home = () => {
    const [discover,setDiscover] = useState([])
    const [categories, setCategories] = useState([])
    const [popular, setPopular] = useState([])

    useEffect(() => {
        // Discover
         
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
  .then(res => res.json())
  .then(data => {
    if (data.meals && data.meals.length > 0) {
      setDiscover(data.meals[0]);
    } else {
      console.log("No meals found");
    }
  })
  .catch(err => console.log(err.message));
// Categories
        fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
        .then(res => res.json())
        .then(data =>{
            setCategories(data.categories)
        })
        .catch(err => console.log(err.message))

    // Popular
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=b")
        .then(res => res.json())
        .then(data =>{
            setPopular(data.meals)
        })
        .catch(err => console.log(err.message))
    }, [])
  return (
    <div className='home'>
        <Filterpage/>
        <div>
            <div className="discover mt-5">
                <h1 className='text-3xl font-Lora font-bold mb-5'>Discover</h1>
                {
                    discover ? (
                        <div className=' relative h-72 font-LosefinSans lg:w-full bg-black rounded-xl overflow-hidden shadow-xl'>
                            <Link to={`/recipe/${discover.strMeal}`}>
                            <div className=' w-full lg:w-full lg:object-cover bg-slate-900  h-72'>
                                 <img src={discover.strMealThumb} alt="" className='w-full opacity-50 object-contain'/>
                            </div>
                            <div className=' absolute top-16 w-80 h-64 flex flex-col left-4'>
                                <h1 className=' text-2xl font-bold  text-white'>{discover.strMeal}</h1>
                                <p  className=' text-xl font-bold text-white p-2'>{discover.strCategory}</p>
                            </div>
                            </Link>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )
                }
            </div>
            <div className='categories mt-5 mb-5'>
                <h1 className='text-3xl font-Lora font-bold mb-5'>Categories</h1>
                <div className='' >
            {
            categories.length > 0 ? (
                <ul className='category flex h-40  gap-5 w-fill overflow-scroll items-center shadow-2xl '>
                {categories.map((category, index) => (
                    // 
                    <li key={index} className='w-32 h-24 border rounded-lg bg-slate-800'>
                    <Link to={`/category/${category.strCategory}`}>
                    <img src={category.strCategoryThumb} alt="" key={index}  className=' h-full w-24 object-center object-cover'/>
                    <p className=' text-2xl lg:text-base md:text-base font-LosefinSans'>{category.strCategory}</p>
                    </Link>
                    </li>
                ))}
                </ul>
            ) : (
                <h1>Loading...</h1>
            )}
            </div>

         <div className="popular mt-5 mb-5">
            <h1 className='text-3xl font-Lora font-bold mb-5'>Popular Recipes</h1>
            {
                popular.length > 0 ?
                (
                   <div className='grid grid-cols-1 place-items-center gap-5 md:grid-cols-4 lg:grid-cols-4 lg:place-items-center rounded-lg'>
                    {popular.map((item, index) => (
                        <div className=' rounded-xl overflow-hidden shadow-2xl w-80 md:w-auto' key={index}>
                           <Link to={`/recipe/${item.strMeal}`}>
                           <img src={item.strMealThumb} alt="" className='w-full md:w-50 lg:w-50 lg:object-contain object-contain'/>
                            <h1 className='py-5 text-1xl px-2 font-LosefinSans'>{item.strMeal}</h1>
                           </Link> 
                        </div>
                    ))}
                   </div>
                ) :(
                    <h2>Loading...</h2>
                )
            }
                </div>
            </div>
        </div>
        </div>
  )
}

export default Home