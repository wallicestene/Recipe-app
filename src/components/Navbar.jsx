import { Avatar } from '@mui/material'
import React from 'react'
import { useFavourite } from './DataLayer'
import { signOut } from 'firebase/auth'
import { auth } from '../Firebase'

const Navbar = () => {
  const [{user}, dispatch] = useFavourite()
  return (
    <div className='navbar flex items-center lg:justify-between justify-between  mt-3 shadow-lg lg:h-20 h-16 p-1'>
        <div className="nav-right">
            <h1 className=' text-2xl text-slate-800 font-bold uppercase'>Find Recipe</h1>
        </div>
        <div className="nav-left flex items-center gap-2">
            <h1 className=' text-sm text-gray-500'>Profile</h1>
           <div onClick={() => signOut(auth)}>
           <Avatar>
            {user?.email[0].toUpperCase()}
           </Avatar>
           </div>
        </div>
    </div>
  )
}

export default Navbar