import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from '../Firebase'
import { useFavourite } from './DataLayer'
import { Avatar } from '@mui/material'
import { Add } from '@mui/icons-material'

const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [image, setImage] = useState("https://cdn-icons-png.flaticon.com/512/3135/3135715.png")
    const [name, setName] = useState("")

    const [{user}, dispatch] = useFavourite()

console.log(user)

    const signIn = (e) => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("user", userCredential)

            updateProfile(userCredential.user, {
                photoURL: image,
                displayName: name,
              })

            dispatch({
                type: "LOG_IN",
                user: {
                    uid : userCredential?.user?.uid,
                    email: userCredential?.user?.email,
                    photoURL: userCredential?.user?.photoURL,
                    displayName: userCredential?.user?.displayName,
                }
            })
        })
        .catch((error) => {
            alert(error.message)
        })
    }

    const Login = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential)=> {
            console.log('user credentials', userCredential);

            updateProfile(userCredential.user, {
                photoURL: image,
                displayName: name,
              })

            dispatch({
                type: "LOG_IN",
                user: {
                    uid : userCredential?.user?.uid,
                    email: userCredential?.user?.email,
                    photoURL: userCredential?.user?.photoURL,
                    displayName: userCredential?.user?.displayName,
                }
            })
        })
        .catch((error) => {
            alert(error.message)
        })
    }

  return (
    <div className='loginPage  border rounded w-96  py-5  flex flex-col gap-20 items-center'>
        <div className=' text-center'>
            <h1>Find Recipe</h1>
        </div>
        <div className=' flex flex-col gap-20 w-full'>
            <div className='text-center flex flex-col items-center gap-5 p-2'>
                <h2>Welcome to Find Recipe</h2>
                <div className=' relative'>
                <img
                src={image}
                alt=""
                className="h-20 w-20 rounded-full object-contain"
                />
               <label htmlFor="profile-pic-upload" className="add-icon-container  inline-block">
                <Add className="add-icon absolute top-0 right-0 w-5 h-5 cursor-pointer text-white bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full" />
                <input
                    type="file"
                    id="profile-pic-upload"
                    className=' hidden'
                    accept="image/*"
                    required
                    onChange={(e) => {
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.onload = () => {
                        setImage(reader.result);
                    };
                    reader.readAsDataURL(file);
                    }}
                />
                </label>
                </div>

            </div>
            <form className='w-full flex flex-col items-center gap-5'>
                <div className=' w-72 border-b-2 border-gray-400'>
                    <p>User's Name</p>
                <input type="text"
                placeholder='Name'
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
                 onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className=' w-72 border-b-2 border-gray-400'>
                    <p>Password</p>
                <input 
                type="password"  
                className='w-full   py-2 px-5 outline-none border-none rounded-sm'
                placeholder='password'
                value={password} 
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