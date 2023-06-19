import React, { useEffect, useState } from 'react'
import { useFavourite } from './DataLayer'
import { Delete, Favorite } from '@mui/icons-material'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import { collection, deleteDoc,  getDocs,  query, where } from 'firebase/firestore'
import { db } from '../Firebase'


const Favrourite = ({favourite, setFavourite}) => {
    const [{user}, dispatch] = useFavourite()
const favouritesCollection = collection(db, "favourites")

    const removeFromFavorites = (item) => {
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
    };

  return (
    <div className='fav bg-gray-50 rounded-md shadow-lg border text-slate-800 lg:h-96 h-72 overflow-y-scroll relative scroll-smooth'>
        <div className='px-5 py-3 border-b-2 mb-2 sticky top-0 bg-white'>
            <h1 className=' font-Lora font-bold tracking-wide text-lg '>Favourites</h1>
        </div>
        {
           favourite && favourite.length > 0 ? (
                <div className='flex flex-col gap-3 lg:gap-5 '>
            {favourite.map((item, index) => (
                <div className='flex justify-between items-center shadow p-2' key={index} >
                    <Link to={`/recipe/${item.strMeal}`} >
                    <div className='flex items-center gap-5'>
                        <div>
                            <img src={item.strMealThumb} alt="" className='lg:h-20 lg:w-20 h-16 w-16 rounded-full object-contain' />
                        </div>
                        <div>
                           <h1 className=' font-LosefinSans lg:text-lg text-base'>{item.strMeal}</h1> 
                        </div>
                    </div>
                    </Link>
                    <div className=' cursor-pointer' onClick={() => removeFromFavorites(item)}>
                        <Delete/>
                    </div>
                </div>
              
            ))}
           
        </div>
            ) : (
                <div className=' flex items-center justify-center'>
                    <p className=' text-gray-600  text-center'>Click the <span className=' text-red'><Favorite/> </span>button to add to Favourites</p>
                </div>
                
            )
        }
    </div>
  )
}

export default Favrourite