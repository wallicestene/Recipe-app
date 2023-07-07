import { Favorite, FavoriteBorderOutlined, KeyboardBackspace } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom"
import { useFavourite } from './DataLayer';
import { db } from '../Firebase'
import { addDoc, collection, deleteDoc, getDocs, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore'
const Categories = () => {
    const [recipe, setRecipe] = useState([])

    const [favourite, setFavourite] = useState([]);

    
    const favouritesCollection = collection(db, "favourites")


    const { category } = useParams()

    const [{user}, dispatch] = useFavourite()

    const history = useHistory()
//    handle click
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

    useEffect(() => {
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then(res => res.json())
        .then(data => {
            setRecipe(data.meals)
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
        <div className='rounded-xl bg-gradient-to-b from-gray-500 from-10% to-100% via-slate-400 overflow-hidden shadow-2xl w-80 md:w-auto transition ease-in-out delay-100  hover:-translate-x-1 hover:scale-105 duration-400' key={index}>
            <Link to={`/recipe/${item.strMeal}`} >
            <img src={item.strMealThumb} alt="" className='w-full md:w-50 lg:w-50 lg:object-contain object-contain'/>
             </Link>
             <div className='flex items-center justify-between p-3'> 
                <p className='text-1xl font-LosefinSans'>{item.strMeal}</p>
                <div className='addtoFav cursor-pointer  text-red ' onClick={() => handleClick(item)}>
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