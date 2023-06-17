import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useFavourite } from './DataLayer'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../Firebase'
import logo from "./logo/logo.png"

const Navbar = () => {

  const [showLogOut, setShowLogOut] = useState(false)

  const [{user}, dispatch] = useFavourite()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // User is signed out
        dispatch({ type: 'LOG_OUT' }); 
      }
    });

    // Cleanup of the event listener
    return () => {
      unsubscribe();
    };
  }, []);


  return (
    
    <div className='navbar flex items-center lg:justify-between justify-between  mt-3 shadow-lg lg:h-20 h-16 p-2'>
        <div className="nav-right  w-1/2 flex items-center gap-4 h-20">
            <img src={logo} alt="" className='w-14 object-contain rounded-md'/>
            <h1 className=' font-Lora lg:text-2xl font-bold tracking-wide'>Recipe Realm</h1>
        </div>
        <div className='relative'>
        <div className="nav-left flex items-center gap-2 ">
            <h1 className=' text-sm text-gray-500 font-LosefinSans first-letter:uppercase'>{user.displayName ? user.displayName : "Profile"}</h1>
           <div onClick={() => setShowLogOut(!showLogOut) } className='h-14 w-14'>
            {!user?.photoURL ? <Avatar>{user?.email[0].toUpperCase()}</Avatar> : user?.photoURL !== null && <img src={user?.photoURL} alt="" className='w-full h-full rounded-full'/>}
           </div>
        </div>
      <div className={` ${!showLogOut ? " hidden" : ""} absolute z-50 top-0 bg-gradient-to-r from-gray-700 to-slate-500 rounded-md -left-2 border text-white p-1`} onClick={() => signOut(auth)}>
      <h1>Log Out</h1>
    </div>
    </div>
    </div>
  )
}

export default Navbar