import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './home'
import FormContainer from './FormContainer'
import MelodyShowContainer from './MelodyShowContainer'
export const App = (props) => {

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/melodies/new' component={FormContainer} />
          <Route exact path='/melodies/:id' component={MelodyShowContainer} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
