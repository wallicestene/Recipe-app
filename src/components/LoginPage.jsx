import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from '../Firebase'
import { useFavourite } from './DataLayer'

const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [image, setImage] = useState("")

    const [{user}, dispatch] = useFavourite()

console.log(user)
    const signIn = (e) => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("user", userCredential)

            dispatch({
                type: "LOG_IN",
                user: {
                    uid : userCredential?.user?.uid,
                    name:  userCredential?.user?.displayName,
                    photo: userCredential?.user?.photoURL,
                    email: userCredential?.user?.email,
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

            dispatch({
                type: "LOG_IN",
                user: {
                    uid : userCredential?.user?.uid,
                    name:  userCredential?.user?.displayName,
                    photo: userCredential?.user?.photoURL,
                    email: userCredential?.user?.email,
                }
            })
        })
        .catch((error) => {
            alert(error.message)
        })
    }

  return (
    <div className='loginPage  border w-96 h-screen py-5  flex flex-col gap-20 items-center'>
        <div className=' text-center'>
            <h1>Find Recipe</h1>
        </div>
        <div className=' flex flex-col gap-20 w-full'>
            <div className='text-center'>Welcome to Find Recipe</div>
            <form className='w-full flex flex-col items-center gap-5'>
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
                <button onClick={Login} className=' bg-gradient-to-r from-sky-500 to-indigo-500 py-2 px-5 rounded-full text-white'>Login</button>
                {/* <p className=''> register</p> */}
                <button onClick={signIn} className=' bg-gradient-to-r from-sky-500 to-indigo-500 py-2 px-5 rounded-full text-white'>Sign Up</button>
            </form>
        </div>
    </div>
  )
}

export default LoginPage