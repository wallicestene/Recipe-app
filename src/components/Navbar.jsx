
import React, { useEffect, useState } from 'react'
import { useFavourite } from './DataLayer'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../Firebase'
import logo from "./logo/logo.png"
import { Avatar } from '@mui/material'
import { Link } from 'react-router-dom/cjs/react-router-dom'

// Function to check if a string is a URL
function isURL(str) {
  try {
    new URL(str);
    return true;
  } catch (err) {
    return false;
  }
}

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
      
      <div className="nav-right  w-1/2 ">
        <Link to="/" className="flex items-center gap-4 h-20">
            <img src={logo} alt="" className='w-14 object-contain rounded-md'/>
            <h1 className=' font-Lora lg:text-2xl font-bold tracking-wide'>Recipe Realm</h1>
           </Link> 
        </div>
      
        
        <div className='relative'>
        <div className="nav-left flex items-center gap-2 ">
            <h1 className=' text-sm text-gray-500 font-LosefinSans first-letter:uppercase'>{user.displayName ? user.displayName : "Profile"}</h1>
           <div onClick={() => setShowLogOut(!showLogOut) } className='h-10 w-10 bg-gradient-to-r from-gray-300 to-slate-900  rounded-full overflow-hidden grid place-items-center text-white cursor-pointer hover:border-2 border-rose-500'>
            {!user?.photoURL ? (<div  className=' w-full h-full flex items-center justify-center font-LosefinSans text-3xl p-1 '>{user?.displayName[0].toUpperCase()}</div>) : isURL(user?.photoURL) ? (<img src={user?.photoURL} alt="" className='w-full h-full'/>): (<div className=' w-full h-full flex items-center justify-center font-LosefinSans text-3xl p-1 '>{user?.displayName[0].toUpperCase()}</div> )}
          </div>
        </div>
      <div className={` ${!showLogOut ? " hidden" : ""} absolute shadow-lg z-50 top-0 bg-gradient-to-r from-gray-700 to-slate-500 rounded-md  -left-8 lg:-left-9 border-2 text-white p-1 cursor-pointer`} onClick={() => signOut(auth)}>
      <h1>Log Out</h1>
    </div>
    </div>
    </div>
  )
}

export default Navbar
