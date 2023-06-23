
import React, { useEffect, useState } from 'react'
import { useFavourite } from './DataLayer'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../Firebase'
import logo from "./logo/logo.png"

import { Link } from 'react-router-dom/cjs/react-router-dom'
import { KeyboardArrowDown, KeyboardArrowUp, Logout } from '@mui/icons-material'

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
          <div onClick={() => setShowLogOut(!showLogOut) } className=' cursor-pointer' >
            <h1 className=' text-sm text-gray-100 font-LosefinSans first-letter:uppercasea'>{user.displayName ? user.displayName : "Profile"}{showLogOut ? <KeyboardArrowUp fontSize='small'/> : <KeyboardArrowDown fontSize='small'/>}</h1>
          </div>
           <div className='h-10 w-10 bg-gradient-to-r from-gray-300 to-slate-900  rounded-full overflow-hidden grid place-items-center text-white border-rose-500'>
           {!user?.photoURL ? (<div  className=' w-full h-full flex items-center justify-center font-poppins text-3xl p-1 '>{user?.displayName ? user.displayName[0].toUpperCase() : ''}</div>) : isURL(user?.photoURL) ? (<img src={user?.photoURL} alt="" className='w-full h-full object-cover'/>): (<div className=' w-full h-full flex items-center justify-center font-poppins font-bold text-3xl p-1 '>{user?.displayName ? user.displayName[0].toUpperCase() : ''}</div> )}
          </div>
        </div>
      <div className={` ${!showLogOut ? " hidden" : ""} absolute z-50 top-11 bg-gradient-to-r from-gray-700 to-slate-500 rounded-md  -left-20 lg:-left-24  text-white p-1 shadow-xl`} >
        <div>
     <div className=' w-fit flex gap-2 p-1 border-b-2'>
      <div className=' w-14 h-14 rounded-full overflow-hidden bg-gradient-to-r from-gray-300 to-slate-900 '>
      {!user?.photoURL ? (<div  className=' w-full h-full flex items-center justify-center font-poppins text-3xl p-1 '>{user?.displayName ? user.displayName[0].toUpperCase() : ''}</div>) : isURL(user?.photoURL) ? (<img src={user?.photoURL} alt="" className='w-full h-full'/>): (<div className=' w-full h-full flex items-center justify-center font-poppins font-bold text-3xl p-1 '>{user?.displayName ? user.displayName[0].toUpperCase() : ''}</div> )}
      </div>
     <div className=' grid place-items-center'>
     <p className="text-sm first-letter:uppercase">{user.displayName}</p>
     <p className="text-sm">{user.email}</p>
     </div>
     </div>
     <div className='lg:p-3 p-2 grid place-items-center' >
      <h1 className='cursor-pointer inline border p-1 rounded-md text-xs transition ease-in-out delay-100  hover:-translate-x-1 hover:scale-90 duration-200' onClick={() => signOut(auth)}>Log Out <Logout fontSize='small'/></h1>
     </div>
     </div>
    </div>
    </div>
    </div>
  )
}

export default Navbar
