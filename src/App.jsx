import React, { useEffect, useState } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min'
import Home from './components/Home'
import Navbar from './components/Navbar'
import RecipePage from './components/RecipePage'
import Categories from './components/Categories'
import Favrourite from './components/Favrourite'
import LoginPage from './components/LoginPage'
import { useFavourite } from './components/DataLayer'
import { auth } from './Firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { CircularProgress } from '@mui/material'
import { toast } from 'react-hot-toast'

const App = () => {
  const [{ user }, dispatch] = useFavourite()
  const [loading, setLoading] = useState(true)
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch({
          type: 'LOG_IN',
          user: {
            uid: userAuth.uid,
            email: userAuth.email,
            photoURL: userAuth.photoURL,
            displayName: userAuth.displayName
          }
        })
        setShowToast(true)
      } else {
        dispatch({
          type: 'LOG_OUT',
          user: null
        })
      }
      setLoading(false)
    })
    return unsubscribe
  }, [dispatch])

  useEffect(() => {
    if (showToast &&user?.displayName) {
      toast.custom(
        <div className='lg:p-5 p-3 shadow-lg border-b bg-gradient-to-r from-gray-400 via-slate-400 to-slate-500  rounded-xl'>
         <h1 className=' font-Shadows text-lg font-semibold tracking-wide'>Welcome back, <strong className='uppercase font-poppins'>{user.displayName}!</strong></h1>
        <p className='text-base lg:text-lg font-LosefinSans  text-white'>Get ready to explore delicious recipes and discover new favorites.</p>
        </div>
      ,{
        duration: 3500
      })
      setShowToast(false)
    }
  }, [showToast, user])

  if (loading) {
    return <div className='grid place-items-center h-screen'><CircularProgress /></div>
  }

  return (
    <div className='app lg:mx-auto lg:w-11/12 mx-2'>
      {!user ? (
        <div className='grid place-items-center h-screen'>
          <LoginPage />
        </div>
      ) : (
        <Router>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/recipe/:name' component={RecipePage} />
            <Route path='/category/:category' component={Categories} />
          </Switch>
        </Router>
      )}
    </div>
  )
}

export default App
