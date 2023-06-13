
import { FavoriteBorder, Search, Tune } from '@mui/icons-material'
import React from 'react'

const Filterpage = () => {
  return (
    <div className='filterpage flex items-center justify-between mt-5'>
        <div className="filter-left">
            <form className='flex gap-3 items-center'>
                <div className=' bg-gray-200 flex items-center rounded shadow-xl w-60 lg:w-72'>
                <Search/>
                <input type="text" className='py-2  outline-none bg-transparent w-full' />
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