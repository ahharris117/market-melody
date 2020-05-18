import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './Home'
import FormContainer from './FormContainer'
import MelodyShowContainer from './MelodyShowContainer'
import UsersShowContainer from './UsersShowContainer'
import Feed from './Feed'
import NavBar from './NavBar'

export const App = (props) => {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <div className="app-container">
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/melodies/new' component={FormContainer} />
            <Route exact path='/melodies/:id' component={MelodyShowContainer} />
            <Route exact path='/users/:id' component={UsersShowContainer} />
            <Route exact path='/melodies' component={Feed} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App
