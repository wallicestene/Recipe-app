import { Avatar } from '@mui/material'
import React from 'react'
import { useFavourite } from './DataLayer'
import { signOut } from 'firebase/auth'
import { auth } from '../Firebase'
import logo from "./logo/logo.png"

const Navbar = () => {
  const [{user}, dispatch] = useFavourite()
  return (
    <div className='navbar flex items-center lg:justify-between justify-between  mt-3 shadow-lg lg:h-20 h-16 p-2'>
        <div className="nav-right  w-1/2 flex items-center gap-4 h-20">
            <img src={logo} alt="" className='w-14 object-contain rounded-md'/>
            <h1 className=' font-Lora lg:text-2xl font-bold tracking-wide'>Recipe Realm</h1>
        </div>
        <div className="nav-left flex items-center gap-2">
            <h1 className=' text-sm text-gray-500 font-LosefinSans first-letter:uppercase'>{user.displayName}</h1>
           <div onClick={() => signOut(auth)} className='h-14 w-14'>
           <img src={user.photoURL} alt="" className='w-full h-full rounded-full'/>
           </div>
        </div>
    </div>
  )
}

export default Navbar