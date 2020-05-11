import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Soundwave from 'images/soundwave.jpg'
import HomeLink from './homelink'
const Home = props => {
  const [ currentUser, setCurrentUser ] = useState(false)

  useEffect(() => {
    fetch('/api/v1/users' , {
      credentials: "same-origin",
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
    .then((response) => {
      return response.json()
    })
    .then((body) => {
      if (body !== null) {
        setCurrentUser(body)
      }
    })
  }, [])

  let homeLink = ""
  if (currentUser === false) {
    homeLink = (
      <HomeLink text="Sign up" link={'/users/sign_up'} />
    )
  } else {
    homeLink = (
      <HomeLink text="Profile" link={`/users/${currentUser.user.id}`} />
    )
  }
  return(
    <div>
      <div>
        <img className="main-image" src={Soundwave} />
      </div>
      <h3 className="homeline">Hear Your Portfolio</h3>
      <div className="grid-container">
        <div className="grid-margin-x grid-x">
          <HomeLink text="Create" link={"/melodies/new"}/>
          {homeLink}
          <HomeLink text="The Feed" link={"/melodies"} />
        </div>
      </div>
    </div>
  )
}

export default Home
