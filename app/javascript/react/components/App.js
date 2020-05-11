import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './home'
import FormContainer from './FormContainer'
import MelodyShowContainer from './MelodyShowContainer'
import UsersShowContainer from './UsersShowContainer'
import Feed from './Feed'
export const App = (props) => {

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/melodies/new' component={FormContainer} />
          <Route exact path='/melodies/:id' component={MelodyShowContainer} />
          <Route exact path='/users/:id' component={UsersShowContainer} />
          <Route exact path='/melodies' component={Feed} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
