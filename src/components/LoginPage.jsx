import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from '../Firebase'
import { useFavourite } from './DataLayer'
import { Avatar } from '@mui/material'
import { Add } from '@mui/icons-material'

const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [image, setImage] = useState("")
    const [name, setName] = useState("")

    const [{user}, dispatch] = useFavourite()

console.log(user)
// Sign in
const signIn = (e) => {
    e.preventDefault();

    if(!name){
        return alert("please enter a first name")
      };

      if(!image){
        return alert("please enter a Profile photo url")
      }
    

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
    
        updateProfile(userCredential.user, {
            photoURL: image,
            displayName: name,
          })
          .then(() => {
            console.log("User profile updated successfully!");
            dispatch({
              type: "LOG_IN",
              user: {
                uid: userCredential?.user?.uid,
                email: userCredential?.user?.email,
                photoURL: image,
                displayName: name,
              },
            });
          })
          .catch((error) => {
            console.log("Error updating user profile:", error);
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  
//   login
  const Login = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        dispatch({
            type: "LOG_IN",
            user: {
              uid: userCredential?.user?.uid,
              email: userCredential?.user?.email,
              photoURL: userCredential.user?.photoURL,
              displayName: userCredential.user.displayName,
            },
          });

      })
      .catch((error) => {
        alert(error.message);
      });
  };
  

  return (
    <div className='loginPage  border rounded w-96  py-5  flex flex-col gap-20 items-center'>
        <div className=' text-center'>
            <h1 className=' lg:text-3xl text-2xl font-LosefinSans font-bold'>Recipe Realm</h1>
        </div>
        <div className=' flex flex-col gap-20 w-full'>
            <div className='text-center flex flex-col items-center gap-5 p-2'>
                <h2>Welcome to Recipe Realm</h2>
            </div>
            <form className='w-full flex flex-col items-center gap-5'>

            <div className=' w-72 border-b-2 border-gray-400'>
                    <p>User's Profile</p>
                <input type="text"
                placeholder=' Profile Photo URL (Optional)'
                required
                className=' w-full  py-2 px-5 outline-none border-none rounded-sm '
                 value={image} 
                 onChange={(e) => setImage(e.target.value)} />
                </div>

                <div className=' w-72 border-b-2 border-gray-400'>
                    <p>User's Name</p>
                <input type="text"
                placeholder='Name (Required if registering)'
                required
                className=' w-full  py-2 px-5 outline-none border-none rounded-sm '
                 value={name} 
                 onChange={(e) => setName(e.target.value)} />
                </div>
                <div className=' w-72 border-b-2 border-gray-400'>
                    <p>User's Email</p>
                <input type="text"
                placeholder='Email'
                className=' w-full  py-2 px-5 outline-none border-none rounded-sm '
                 value={email} 
                 required
                 onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className=' w-72 border-b-2 border-gray-400'>
                    <p>Password</p>
                <input 
                type="password"  
                className='w-full   py-2 px-5 outline-none border-none rounded-sm'
                placeholder='password'
                value={password} 
                required
                onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className='flex items-center gap-10 mt-10'>
                    <button onClick={Login} className=' h-10 w-32 bg-gradient-to-r from-sky-500 to-indigo-500 py-2 px-5 rounded-full text-white'>Login</button>
                {/* <p className=''> register</p> */}
                <button onClick={signIn} className='  h-10 w-32 bg-gradient-to-r from-sky-500 to-indigo-500 py-2 px-5 rounded-full text-white'>Sign Up</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default LoginPage