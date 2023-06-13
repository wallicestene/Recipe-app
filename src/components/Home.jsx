import React, { useEffect, useState } from 'react'
import Filterpage from './Filterpage'
import { AccessTime } from '@mui/icons-material'

const Home = () => {
    const [discover,setDiscover] = useState([])

    useEffect(() => {
        fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then(res => res.json())
        .then(data =>{
            setDiscover(data.meals[0])
            console.log(data.meals[0])
        })
        .catch(err => console.log(err.message))
    }, [])
  return (
    <div className='home'>
        <Filterpage/>
        <div>
            <div className="discover">
                <h1 className='text-3xl font-serif font-bold'>Discover</h1>
                {
                    discover ? (
                        <div className=' relative h-80'>
                            <div className=' w-full lg:w-80 lg:object-contain bg-slate-900 rounded-xl overflow-hidden shadow-xl'>
                                 <img src={discover.strMealThumb} alt="" className='w-full opacity-50'/>
                            </div>
                            <div className=' absolute top-16 w-80 h-64 flex flex-col  justify-evenly left-4'>
                                <h1 className=' text-2xl font-bold font-serif text-white'>{discover.strMeal}</h1>
                                <p  className=' text-2xl font-bold font-serif text-white p-2 bg-gray-400 rounded w-fit'>{discover.strCategory}</p>
                            </div>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )
                }
            </div>
            <div className='categories'>

            </div>
            <div className="popular">

            </div>
        </div>
    </div>
  )
}

export default Home