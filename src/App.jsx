import React from 'react'
import { HashRouter as Router, Route , Switch } from 'react-router-dom/cjs/react-router-dom.min'
import Home from './components/Home'
import Navbar from './components/Navbar'
const App = () => {
  return (
    <div className='app lg:mx-auto lg:w-11/12 mx-2'>
      <Router>
        <Navbar/>
        <Switch>
          <Route path='/' component={Home} />
        </Switch>
      </Router>
    </div>
  )
}

export default App