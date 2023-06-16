
import { Close, Favorite, FavoriteBorder, Search, Tune } from '@mui/icons-material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom'

const Filterpage = ({searchMeal, showFavourites, setShowFavourites}) => {
  const [input, setInput] = useState("")
  const [searched, setSearched] = useState(false)

  const handleSubmit = (e) =>{
    e.preventDefault()
    searchMeal(input)
    setInput("")
   
  }
  return (
    <div className='filterpage flex items-center justify-between mt-5'>
        <div className="filter-left">
            <form className='flex gap-3 items-center' onSubmit={handleSubmit}>
                <div className='  flex items-center rounded-full shadow-xl w-64 border lg:w-96 p-1'>
                <Search/>
                <input type="text" value={input} placeholder='Search by name' className='lg:py-2 py-2 outline-none bg-transparent w-full indent-3' onChange={(e) => setInput(e.target.value)}/>
                </div>
                {/* <Tune className=' text-slate-600'/> */}
            </form>
        </div>
        <div className="filter-right hover:cursor-pointer flex items-center gap-1 text-rose-500" onClick={() => setShowFavourites(!showFavourites)}>
          <h1 className=' text-sm text-gray-800'>Favourites</h1>
          {showFavourites ? <div className='text-black'> <Close fontSize='large' /></div> : <Favorite fontSize='large'/> }
        </div>
    </div>
  )
}

export default Filterpage