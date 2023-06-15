
import { FavoriteBorder, Search, Tune } from '@mui/icons-material'
import React, { useState } from 'react'

const Filterpage = ({searchMeal}) => {
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
                <div className=' bg-gray-200 flex items-center rounded shadow-xl w-60 lg:w-72'>
                <Search/>
                <input type="text" value={input} className='py-2  outline-none bg-transparent w-full' onChange={(e) => setInput(e.target.value)}/>
                </div>
                <Tune className=' text-slate-600'/>
            </form>
        </div>
        <div className="filter-right">
            <FavoriteBorder/>
        </div>
    </div>
  )
}

export default Filterpage