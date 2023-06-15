import React, { useEffect, useState } from 'react'
import Filterpage from './Filterpage'
import { AccessTime, Delete,FavoriteBorderOutlined } from '@mui/icons-material'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import { useFavourite } from './DataLayer'
import Favrourite from './Favrourite'

const Home = () => {
    const [discover,setDiscover] = useState([])

    const [categories, setCategories] = useState([])

    const [popular, setPopular] = useState([])

    const [searched, setSearched] = useState(false)

    const [found, setFound] = useState(true)

    const [isInFavourite, setIsInFavourite] = useState(false)

    const [showFavourites, setShowFavourites] = useState(false)

    const [{favourite}, dispatch] = useFavourite()

    console.log(favourite)

    const addToFavourite = (item) => {
       const itemInFavourite = favourite.find(favItem => favItem.strMeal === item.strMeal)

       if(itemInFavourite){
        alert('Already in your list')
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

// search
    const searchMeal = (meal) => {
       
        if(meal){
         fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
          .then((res) => res.json())
          .then((data) => {
            
              setDiscover(data.meals[0]);
              setSearched(true);
              setFound(true)
            })
            .catch((err) => {
            console.log(err.message)
            setFound(false)
          });
              }else{
                fetch("https://www.themealdb.com/api/json/v1/1/random.php")
                .then(res => res.json())
                .then(data => {
                  if (data.meals && data.meals.length > 0) {
                    setDiscover(data.meals[0]);
                    setFound(true)
                  } else {
                    console.log("No meals found");
                  }
                })
                .catch(err => console.log(err.message));
              }          
      };

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
    <div className='home relative'>
        <Filterpage searchMeal={searchMeal} showFavourites={showFavourites} setShowFavourites={setShowFavourites}/>
        <div>
            <div className="discover mt-5 text-slate-800">
                { found && <h1 className='text-3xl font-Lora font-bold mb-5'>{searched ? "Your Search" : "Discover"}</h1>}
                {!found && <h1 className='text-3xl font-Lora font-bold mb-5'>Not Found</h1>}
                {
                    discover ? (
                        <div className=' relative h-72 font-LosefinSans lg:w-full bg-black rounded-xl overflow-hidden shadow-xl'>
                            <Link to={`/recipe/${discover.strMeal}`}>
                            <div className=' w-full lg:w-full lg:object-cover bg-slate-900  h-72'>
                                 <img src={discover.strMealThumb} alt="" className='w-full opacity-50 object-contain'/>
                            </div>
                            <div className=' absolute top-16 w-80 h-64 flex flex-col left-4 z-40'>
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
                <ul className='category flex h-40  gap-7 w-fill overflow-scroll items-center'>
                {categories.map((category, index) => (
                    <Link key={index} to={`/category/${category.strCategory}`}>
                    <li  className=' w-full lg:px-10 md:px-7 px-6 h-24 border rounded-lg bg-slate-800 opacity-90 flex flex-col items-end justify-end' style={{backgroundImage: `url(${category.strCategoryThumb})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat",}}>                   
                    {/* <img src={category.strCategoryThumb} alt="" key={index}  className=' h-full w-24 object-center object-cover'/> */}
                    <div className='mb-2 bg-slate-800 lg:p-2 p-1 rounded-sm shadow-md bg-opacity-70'>
                         <p className=' lg:text-xl text-base md:text-base font-LosefinSans text-white '>{category.strCategory}</p>
                    </div>
                    </li>
                    </Link>
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
                            
                           </Link> 
                            <div className='flex items-center justify-between p-3'>
                                <h1 className='text-1xl font-LosefinSans'>{item.strMeal}</h1>
                           <div className='addtoFav text-black cursor-pointer' onClick={() => addToFavourite(item)}>
                           <FavoriteBorderOutlined/> 
                            </div>
                            </div>
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
        {
            showFavourites && 
            <div className='absolute top-14 z-40 w-full lg:w-96 lg:right-0'>
            <Favrourite/>
            </div>
        }
        </div>
  )
}

export default Home