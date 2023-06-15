import React from 'react'
import { HashRouter as Router, Route , Switch } from 'react-router-dom/cjs/react-router-dom.min'
import Home from './components/Home'
import Navbar from './components/Navbar'
import RecipePage from './components/RecipePage'
import Categories from './components/Categories'
import Favrourite from './components/Favrourite'
const App = () => {
  return (
    <div className='app lg:mx-auto lg:w-11/12 mx-2'>
      <Router>
        <Navbar/>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path="/recipe/:name" component={RecipePage}/>
          <Route path="/category/:category" component={Categories}/>
        </Switch>
      </Router>
    </div>
  )
}

export default App