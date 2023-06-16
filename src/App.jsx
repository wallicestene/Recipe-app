import React, { useEffect, useState } from 'react'
import { HashRouter as Router, Route , Switch } from 'react-router-dom/cjs/react-router-dom.min'
import Home from './components/Home'
import Navbar from './components/Navbar'
import RecipePage from './components/RecipePage'
import Categories from './components/Categories'
import Favrourite from './components/Favrourite'
import LoginPage from './components/LoginPage'
import { useFavourite } from './components/DataLayer'
import { auth } from './Firebase'
import { onAuthStateChanged } from 'firebase/auth'

const App = () => {
  const [login ,setLogIn] = useState(false)

  const [{user}, dispatch] = useFavourite()

    useEffect(() => {
      const unSubscribe = onAuthStateChanged(auth, (user) => {
        if(user){
          dispatch({
            type: "LOG_IN",
            user: {
                uid : user?.uid,
                name:  user?.displayName,
                photo: user?.photoURL,
                email: user?.email,
            }
        })
        }else{
          dispatch({
            type: "LOG_OUT",
            user: null
          })
        }
      })
      return unSubscribe
    },[dispatch])
  return (
    <div className='app lg:mx-auto lg:w-11/12 mx-2'>
      {
        !user ? (
          <div className=' grid place-items-center mt-10'>
        <LoginPage/>
      </div>
        ) : (
       <Router>
        <Navbar/>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path="/recipe/:name" component={RecipePage}/>
          <Route path="/category/:category" component={Categories}/>
        </Switch>
      </Router> 
        )
      }
      
      
      
    </div>
  )
}

export default App