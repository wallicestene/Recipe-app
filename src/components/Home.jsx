import React, { useEffect, useState } from 'react'
import Filterpage from './Filterpage'
import { Close, Favorite,FavoriteBorderOutlined, Tune } from '@mui/icons-material'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import { useFavourite } from './DataLayer'
import Favrourite from './Favrourite'
import { Alert, Skeleton } from '@mui/material'
import { addDoc, collection, deleteDoc, getDocs, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore'
import { db } from '../Firebase'
import FilterBy from './FilterBy'

const Home = () => {
    const [discover,setDiscover] = useState([])

    const [categories, setCategories] = useState([])

    const [popular, setPopular] = useState([])

    const [favourite, setFavourite] = useState([]);

    const [value, setValue] = useState(2)

    const [searched, setSearched] = useState(false)

    const [found, setFound] = useState(true)

    const [showFavourites, setShowFavourites] = useState(false)

    const [showFilterBy, setShowFilterBy] = useState(false)

    const [{user}, dispatch] = useFavourite()
   
    const mealsLetter = ["a", "b", "c", "d", "e"]

    const skeleton = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,,18,19,20]

    const favouritesCollection = collection(db, "favourites")

    const handleClick = (item) => {
        const intheFavourite = favourite.find((favItem) => favItem.strMeal === item.strMeal);
      
        if (!intheFavourite) {
          addDoc(favouritesCollection, { ...item, userId: user.uid, createdAt: serverTimestamp() })
            .then(() => {
              console.log('Favorite added successfully');
            })
            .catch((error) => {
              console.log('Error adding favorite: ', error);
            });
        } else {
          const q = query(favouritesCollection, where('idMeal', '==', item.idMeal), where('userId', '==', user.uid));
          getDocs(q)
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                deleteDoc(doc.ref)
                  .then(() => {
                    console.log('Favorite removed successfully');
                    setFavourite((prevFavorites) =>
                      prevFavorites.filter((favItem) => favItem.idMeal !== item.idMeal)
                    );
                  })
                  .catch((error) => {
                    console.log('Error removing favorite: ', error);
                  });
              });
            })
            .catch((error) => {
              console.log('Error querying favorites: ', error);
            });
        }
      };
      

    useEffect(() => {
        if (user) {
          const q = query(favouritesCollection, where('userId', '==', user.uid), orderBy("createdAt", "desc"));
          const unsubscribe = onSnapshot(q, (snapshot) => {
            const favorites = snapshot.docs.map((doc) => doc.data());
            setFavourite(favorites);
          }, (error) => {
            console.log('Error fetching favorites: ', error);
          });
      
          return () => {
            unsubscribe();
          };
        }
      }, [user]);
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
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${mealsLetter[value]}`)
        .then(res => res.json())
        .then(data =>{
            setPopular(data.meals)
        })
        .catch(err => console.log(err.message))
    }, [value])
// Filter by Area function
    const filterByArea = (area) =>{
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
        .then(res => res.json())
        .then(data =>{
          if (data.meals && data.meals.length > 0) {
            setPopular(data.meals)
          } else {
            console.log("No meals found");
          }
        })
        .catch(err => console.log(err.message))
    }
    // Filter by Ingredient function
    const filterByIngredient = (ingredient) =>{
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
        .then(res => res.json())
        .then(data =>{
          if (data.meals && data.meals.length > 0) {
            setPopular(data.meals);
          } else {
            console.log("No meals found");

          }
        })
        .catch(err => console.log(err.message))
    }

  return (
    <div className='home relative ' >
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
                            <div className='absolute z-40 top-10 right-5 text-white h-10 w-10 grid place-items-center hover:cursor-pointer' onClick={() => handleClick(discover)}>
                            {favourite.find((favItem) => favItem.strMeal === discover.strMeal) ? (
                            <Favorite fontSize='large'/> 
                            ) : (
                           <FavoriteBorderOutlined fontSize='large'/>
                            )} 


                            </div>
                           
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
                <ul className='category flex h-40  gap-3 w-fill overflow-x-scroll items-center bg-gradient-to-b from-gray-500 from-10% to-100% via-slate-400 rounded-lg'>
                {categories.map((category, index) => (
                    <Link key={index} to={`/category/${category.strCategory}`}>
                    <li  className=' w-full lg:px-10 md:px-7 px-6 h-24 border rounded-lg opacity-90 flex flex-col items-end justify-end shadow-2xl transition ease-in-out delay-75  hover:-translate-x-1 hover:scale-110 duration-200' style={{backgroundImage: `url(${category.strCategoryThumb})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat",}}>                   
                    {/* <img src={category.strCategoryThumb} alt="" key={index}  className=' h-full w-24 object-center object-cover'/> */}
                    <div className='mb-2 bg-slate-800 lg:p-2 p-1 rounded-sm shadow-md bg-opacity-70'>
                         <p className=' lg:text-xl text-base md:text-base font-LosefinSans text-white '>{category.strCategory}</p>
                    </div>
                    </li>
                    </Link>
                ))}
                </ul>
            ) : (
              <div className='skeleton flex gap-3 overflow-x-auto'>
              {
                  skeleton.map((item, index) => (
                     <div key={index} className='shadow-md'>
                       <Skeleton sx={{ bgcolor: 'grey.400' }}  variant="rounded" width={120} height={80} />
                     </div>
                  ))
              }
          </div>
            )}
            </div>

         <div className=" mt-5 mb-5 h-96 relative">
          <div className='flex items-center mb-5 gap-3 '>
              <h1 className=' text-3xl font-Lora font-bold '>Popular Recipes</h1>
              <div onClick={() => setShowFilterBy(!showFilterBy)} className=' hover:cursor-pointer'>
                <p className=' px-3 py-1 rounded-md bg-gradient-to-r from-gray-800 via-slate-600 to-slate-800 text-white text-lg font'>Filter <span className=' text-white'>{!showFilterBy ? <Tune /> : <Close/>}</span></p>
              </div>
              {
                showFilterBy &&
                <div className=' rounded-md p-1 bg-gray-50 shadow-2xl lg:w-96 w-80 h-fit absolute z-40 top-10 lg:left-96 left-1/2 right-1/2 -translate-x-1/2'>
                <FilterBy 
                filterByArea={filterByArea} 
                filterByIngredient={filterByIngredient}
                showFilterBy={showFilterBy}
                setShowFilterBy={setShowFilterBy}
                />
              </div>
              }
          </div>
           
            <div className='popular bg-gradient-to-b from-gray-300 to-slate-400  h-full overflow-y-scroll lg:p-5 rounded-xl'>
            {
                popular.length > 0 ?
                (
                   <div className='grid grid-cols-1 place-items-center gap-5 md:grid-cols-4 lg:grid-cols-4 lg:place-items-center rounded-lg'>
                    {popular.map((item, index) => (
                        <div className=' rounded-xl bg-gradient-to-b from-gray-500 from-10% to-100% via-slate-400 overflow-hidden shadow-2xl w-80 md:w-auto transition ease-in-out delay-100  hover:-translate-x-1 hover:scale-105 duration-400' key={index}>
                           
                           <Link to={`/recipe/${item.strMeal}`}>
                           <img src={item.strMealThumb} alt="" className='w-full md:w-50 lg:w-50 lg:object-contain object-contain'/>
                            
                           </Link> 
                            <div className='flex items-center justify-between p-3'>
                                <h1 className='text-1xl font-LosefinSans text-s-black'>{item.strMeal}</h1>
                           <div className='addtoFav cursor-pointer text-red ' onClick={() => handleClick(item)}>

                        {favourite.find((favItem) => favItem.strMeal === item.strMeal) ? ( 
                            <Favorite/>
                           ) : (
                            <FavoriteBorderOutlined />
                        )} 
                        

                            </div>
                            </div>
                        </div>
                    ))}
                   </div>
                ) :(
                  <div className='skeleton grid grid-cols-1 place-items-center gap-5 md:grid-cols-4 lg:grid-cols-4 lg:place-items-center rounded-lg'>
                  {
                      skeleton.map((item, index) => (
                         <div key={index} className='shadow-md w-fit'>
                           <Skeleton sx={{ bgcolor: 'grey.400' }}  variant="rounded" width={265} height={280} />
                         </div>
                      ))
                  }
              </div>
                )
            }
                </div>
            </div>
        </div>
        </div>
        {
            showFavourites && 
            <div className='absolute top-14 z-40 w-full lg:w-2/5 lg:right-0'>
            <Favrourite favourite={favourite} setFavourite={setFavourite}/>
            </div>
        }
        </div>
  )
}

export default Home